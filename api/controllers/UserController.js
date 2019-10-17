/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //GET  /user/whoami

  whoami: function(req, res) {
    return res.json({
      me: req.session.me
    });
  },

  // GET imoji/user/:id
  //localhost:1337/user/erwr2342342
  // find a single user
  findOne: function(req, res) {
    let twitterLoginUrl;

    const Twitter = require("machinepack-twitter");
    // Get the URL on twitter.com that a user should visit to allow/deny the specified Twitter Developer app (i.e. your app).
    Twitter.getLoginUrl({
      consumerKey: "g0iU3phT6pVLFthrU66YYfdhQ",
      consumerSecret: "7u2XCyixIkXYTjkw8WCjyOxd39T1YwQsqqVHpUGRSI6Ni83UZp",
      callbackUrl: "http://localhost:1337/twitter/"
    }).exec({
      // An unexpected error occurred.

      error: function(err) {
        if (err) {
          throw new Error(err);
        }
      },

      // OK.
      success: function(twitterLoginUrl) {
        User.findOne({ screenName: req.param("screenName") }).exec(function(
          err,
          user
        ) {
          if (err) {
            throw new Error(err);
          }

          // subsribe changes to this current user
          // will send socket event when new change occurs
          //   User.subscribe(req, user.id);

          if (!user) {
            res.status(404).json({ err: "no user found" });
          }

          // find all the imogis that belongs to this user
          Emoji.find({ owner: user.id }).exec(function(err, emojis) {
            if (err) {
              throw new Error("failed tho find your emojis");
            }

            return res.view("pages/profile", {
              user: user,
              emojis: emojis,
              twitterLoginUrl: twitterLoginUrl
            });
          });
        });
      }
    });
  }
};
