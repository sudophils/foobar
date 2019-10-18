/**
 * TwitterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Twitter = require("machinepack-twitter");

module.exports = {
  handleLogin: function(req, res) {
    Twitter.getAccessToken({
      consumerKey: sails.config.twitter.consumerKey,
      consumerSecret: sails.config.twitter.consumerSecret,
      oauthToken: req.param("oauth_token"),
      oauthVerifier: req.param("oauth_verifier")
    }).switch({
      // An unexpected error occurred.

      error: function(err) {
        if (err) {
          return res.json(err);
        }
      },

      // OK.

      success: function(accessTokenMetadata) {
        // Get a user's Twitter profile information.

        Twitter.getUserProfile({
          consumerKey: sails.config.twitter.consumerKey,
          consumerSecret: sails.config.twitter.consumerSecret,
          screenName: accessTokenMetadata.screenName,
          accessToken: accessTokenMetadata.accessToken,
          accessSecret: accessTokenMetadata.accessSecret
        }).switch({
          // An unexpected error occurred.

          error: function(err) {
            return res.json(err);
          },

          // OK.
          success: function(result) {
            req.session.me = accessTokenMetadata.screenName;
            return res.ok();
          }
        });
      }
    });
  }
};
