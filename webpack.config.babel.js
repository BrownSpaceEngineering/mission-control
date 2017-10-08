var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');

var cssModulesIdentName = '[name]__[local]__[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules\/(?!(bootstrap|react-html5video)\/).*/,
        loader: 'style-loader!css-loader?localIdentName=' + cssModulesIdentName + '&modules&importLoaders=1&sourceMap!postcss-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.mp4$/,
        loader: 'url?limit=10000&mimetype=video/mp4'
      },
      {
        test: /\.html$/,
        loader: 'html-loader?attrs[]=video:src'
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },

  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
