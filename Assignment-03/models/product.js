const mongoose = require("mongoose");
let productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});
module.exports = mongoose.model("product", productSchema);