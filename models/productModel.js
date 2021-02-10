var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
    url : String,
    name : String,
    quantity : Number,
    price : Number,
    edition : String
});

module.exports = mongoose.model("productModel",ProductSchema, "product");