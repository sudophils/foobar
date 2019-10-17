/**
 * EmojiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  associateWithUser: function(req, res) {
    //update user and associate him with emoji
    // res.json({ ok: "hello world" });
    Emoji.update({ id: req.param("id") }, { owner: req.param("owner") }).exec(
      function(err) {
        if (err) {
          return res.status(400).json("No user found");
        }
        return res
          .status(200)
          .json({
            ok: `You have successfully made ${req.param(
              "owner"
            )} the owner of the imoji ${req.param("id")}`
          });
      }
    );
  }
};
