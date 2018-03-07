import Express from 'express';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import Busboy from 'express-busboy';
import compression from 'compression';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import socketServer from 'socket.io';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Websocket setup
import registerListeners from './listeners';

// Import required modules
import fetchRoutes from './util/fetchRoutes';
import { fetchComponentData } from './util/fetchData';
import api from './routes/api.routes';
import serverConfig from './config';

// ------- Create Session & Cookies -------
app.use(cookieSession({
  name: 'bse-session',
  secret: 'keyboard cat',

  // Cookie Options
  maxAge: 7200000,
  signed: true,
}));
app.use((req, res, next) => {
  if (!req.session.login) {
    req.session.login = 'logout';
  }
  next();
});

app.use(cookieParser());
app.use((req, res, next) => {
  if (!req.cookies['force-desktop']) {
    res.cookie('force-desktop', false);
  }
  next();
});

// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use((req, res, next) => {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
  next();
});

// Apply body Parser and server public assets and routes
Busboy.extend(app, {
  upload: true,
  path: '../uploads',
  allowedPath: /./,
});
app.use(compression());
// app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../dist/client')));

app.use('/api', api);

app.use('/cad', Express.static(path.join(__dirname, '../public/cad')));
app.use('/Assets', Express.static(path.join(__dirname, '../public/Assets')));
app.use('/ThirdParty', Express.static(path.join(__dirname, '../public/ThirdParty')));
app.use('/Widgets', Express.static(path.join(__dirname, '../public/Widgets')));
app.use('/Workers', Express.static(path.join(__dirname, '../public/Workers')));

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes: fetchRoutes(req.headers['user-agent'], req.cookies), location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// Start app
const server = app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${serverConfig.port}!`);
  }
});

// Start websockets
const io = socketServer(server);
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
  });

  registerListeners(socket);
});

export default app;
