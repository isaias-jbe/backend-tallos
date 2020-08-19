const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://127.0.0.1:27017/tallos", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
