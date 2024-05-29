const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  username: String,
  password: String,
  roles: [],
});
let User = mongoose.model("User", userSchema);
module.exports = User;
