/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  // find one emoji
  "GET /emoji": { controller: "EmojiController", action: "find" },

  // find one user
  "GET /user": { controller: "UserController", action: "find" },

  // emoji endpoints
  "/emoji/takeover/:id": {
    controller: "EmojiController",
    action: "associateWithUser"
  },
  "GET /twitter": {
    controller: "TwitterController",
    action: "handleLogin"
  },

  "GET /me": {
    controller: "UserController",
    action: "whoami"
  },

  "GET /:screenName": {
    controller: "UserController",
    action: "findOne"
  }

  // "/": {
  //   controller: "UserController",
  //   action: "findOne"
  // }

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
