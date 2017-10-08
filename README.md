# Mission Control

This is the mission control web app.

## Setting up

Download this repository:

`git clone https://github.com/BrownSpaceEngineering/mission-control.git`

Then go to the repository through `cd mission-control` and download the necessary modules through `npm install`. It will probably throw a few warnings; these are harmless (related to dependency hell) but it would be nice to update in the future.

To start the app on development mode, run `npm start`. This will compile assets on the fly, so you may experience the site being slow to load assets initially.

To compile the app assets for production mode, run `npm run bs`. Compiled files will be stored separately in the dist folder.

To run the app on production mode, run `npm start:prod`. Note that you need to have compiled the app prior before running this command.


## Server Side

All server-side code resides in the /server folder. This server setup follows the MVC (Model-View-Controller) architecture.

- Controllers (in /server/controllers) receive the request from the router, fetch information from the model, and process that information to send to the view.
- Models (in /server/models) are for database logic.
- Views are handled through the Client side of this app.
- Routes (in /server/routes) handle receiving the address and sending them to the necessary controller. Note that routes here will only receive addresses with the /api/ prefix (e.g. /api/addcomment)
- Listeners (in /server/listeners) is for websocket logic.

## Client Side

All client-side code resides in the /client folder. The only files necessary to understand initially are:

- Routes (in /client/routes.js and /client/mobileRoutes.js) handle routing, and loads the respective React module. routes.js is for desktop clients while mobileRoutes.js is for mobile clients, and they can handle routes differently (e.g. sending mobile users to the mobile version of the page); right now they point to the same thing.
- Module components (in /client/modules/Desktop and /client/modules/Mobile) are where React components and CSS files will be saved.

If we are using Redux, the following are also necessary:

- Actions (in /client/actions) is used by components to trigger an update to the Redux store.
- Reducers (in /client/reducers) stores functions specifically for outputting a new Redux store.


