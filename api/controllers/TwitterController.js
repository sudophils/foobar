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
            const data = {
              handle: accessTokenMetadata.screenName,
              banner: accessTokenMetadata.bannerImageUrl,
              photo: accessTokenMetadata.profileImageUrl,
              name: accessTokenMetadata.name,
              location: accessTokenMetadata.location,
              desc: accessTokenMetadata.description,
              followers: accessTokenMetadata.followersCount,
              verified: accessTokenMetadata.isVerified
            };
            req.session.me = accessTokenMetadata.bannerImageUrl


            return res.ok();
          }
        });
      }
    });
  }
};
