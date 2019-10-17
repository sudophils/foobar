/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // GET imoji/user/:id
  //localhost:1337/user/erwr2342342

  // find a single user
  findOne: function(req, res) {
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
      Emoji.find({ user: user.id }).exec(function(err, emojis) {
        if (err) {
          throw new Error("failed tho find your emojis");
        }

        return res.view("pages/profile", { user: user, emojis: emojis });
      });
    });
  }
};
