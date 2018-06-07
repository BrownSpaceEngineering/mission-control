# Mission Control

This is the mission control web app, designed to show all information sent from EQUiSat.

## Setting up

Download this repository:

`git clone https://github.com/BrownSpaceEngineering/mission-control.git`

Then go to the repository through `cd mission-control` and download the necessary modules through `npm install`. It will probably throw a few warnings; these are harmless (related to dependency hell) but it would be nice to update in the future.

To start the app on development mode, run `npm start`. This will compile assets on the fly, so you may experience the site being slow to load assets initially.

To compile the app assets for production mode, run `npm run build`. Compiled files will be stored separately in the build folder.

To run the app on production mode, run `serve -s `. Note that you need to have compiled the app prior before running this command.

## File Structure

- src/
  - assets/ : All css and image files.
  - components/: All React components (Navigation bar, etc.)
  - pages/: All React pages (Cesium page, CAD page, etc.)
  - App.js: The main App component, that holds React Router logic.
  - index.js - The entry point for the web app
- public/: All public files, mainly cesium files
- config/: Configuration files, only need to worry about webpack files
- build/: Build files for production
- package.json: Configuration files for this nodejs project.


