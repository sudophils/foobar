/**
 * TwitterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  handleLogin: function(req, res) {
    Twitter.getAccessToken({
      consumerKey: "g0iU3phT6pVLFthrU66YYfdhQ",
      consumerSecret: "7u2XCyixIkXYTjkw8WCjyOxd39T1YwQsqqVHpUGRSI6Ni83UZp",
      oauthToken: req.param("oauth_token"),
      oauthVerifier: req.param("oauth_verifier")
    }).exec({
      // An unexpected error occurred.

      error: function(err) {
        if (err) {
          throw new Error(err);
        }
      },

      // OK.

      success: function(accessTokenMetadata) {
        req.session.me = "philips-nge";
        return res.ok("logged in");
      }
    });
  }
};
