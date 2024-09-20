const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Token", tokenSchema);
