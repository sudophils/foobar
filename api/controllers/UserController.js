/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var Twitter = require("machinepack-twitter");
module.exports = {
  //GET  /user/whoami

  whoami: function(req, res) {
    // const userdetail = {
    //   handle: req.session.me.handle,
    //   photo: req.session.me.photo,
    //   banner: req.session.me.banner,
    //   location: req.session.me.location,
    //   desc: req.session.me.desc,
    //   verified: req.session.me.verified,
    //   followers: req.session.me.followers
    // };
    //sails.log.debug(userdetail);
    return res.json({
      me: req.session.me
    });
  },

  // GET imoji/user/:id
  //localhost:1337/user/erwr2342342
  // find a single user
  findOne: function(req, res) {
    let twitterLoginUrl;

    Twitter.getLoginUrl({
      consumerKey: sails.config.twitter.consumerKey,
      consumerSecret: sails.config.twitter.consumerSecret,
      callbackUrl: sails.config.twitter.callbackUrl
    }).switch({
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
