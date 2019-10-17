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
    return res.json({
      me: req.session.me
    });
  },

  // GET imoji/user/:id
  //localhost:1337/user/erwr2342342
  // find a single user
  findOne: async function(req, res) {
    let twitterLoginUrl;

    const logUrl = await Twitter.getLoginUrl({
      consumerKey: sails.config.twitter.consumerKey,
      consumerSecret: sails.config.twitter.consumerSecret,
      callbackUrl: sails.config.twitter.callbackUrl
    });

    if (!logUrl) {
      throw new Error("error occured login in");
    }

    const user = await User.findOne({ screenName: req.param("screenName") });

    if (!user) {
      res.status(404).json({ err: "no user found" });
    }

    const emojis = await Emoji.find({ owner: user.id });
    if (!emojis) {
      res.status(404).json({ err: "no user found" });
    }

    return res.view("pages/profile", {
      user: user,
      emojis: emojis,
      twitterLoginUrl: twitterLoginUrl
    });

    // Twitter.getLoginUrl({
    //   consumerKey: "g0iU3phT6pVLFthrU66YYfdhQ",
    //   consumerSecret: "7u2XCyixIkXYTjkw8WCjyOxd39T1YwQsqqVHpUGRSI6Ni83UZp",
    //   callbackUrl: "http://localhost:1337/twitter/"
    // }).exec({
    //   // An unexpected error occurred.

    //   error: function(err) {
    //     if (err) {
    //       throw new Error(err);
    //     }
    //   },

    //   // OK.
    //   success: function(twitterLoginUrl) {
    //     User.findOne({ screenName: req.param("screenName") }).exec(function(
    //       err,
    //       user
    //     ) {
    //       if (err) {
    //         throw new Error(err);
    //       }

    //       // subsribe changes to this current user
    //       // will send socket event when new change occurs
    //       //   User.subscribe(req, user.id);

    //       if (!user) {
    //         res.status(404).json({ err: "no user found" });
    //       }
    //       // find all the imogis that belongs to this user
    //       Emoji.find({ owner: user.id }).exec(function(err, emojis) {
    //         if (err) {
    //           throw new Error("failed tho find your emojis");
    //         }
    //         return res.view("pages/profile", {
    //           user: user,
    //           emojis: emojis,
    //           twitterLoginUrl: twitterLoginUrl
    //         });
    //       });
    //     });
    //   }
    // });
  }
};
