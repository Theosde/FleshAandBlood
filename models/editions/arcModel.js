var mongoose = require("mongoose");

var CardsSchema = mongoose.Schema({
    url : String,
    name : String,
    quantity : Number,
    price : String,
    category : String,
    brand: String
});

module.exports = mongoose.model("arcModel",CardsSchema,'arc')