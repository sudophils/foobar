/**
 * Emoji.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    text: {
      //eg. : )
      type: "string"
    },
    // every emoji belongs to a particular user
    owner: {
      model: "User"
    }
  }
};
