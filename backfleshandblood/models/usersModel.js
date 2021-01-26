var mongoose = require("mongoose");


var AdresseSchema = mongoose.Schema({
    street : String,
    zip : String,
    city : String,
    country : String
});

var HistoricSchema = mongoose.Schema({
    date : Date,
    total : Number,
    status : ["Paid","Delivery","Finish"],
    article : [Object],
    FDP: Number

});

var UsersSchema = mongoose.Schema({
    lastname : String,
    firstname : String,
    email : String,
    password : String,
    salt: String,
    adress : AdresseSchema,
    historic : [HistoricSchema]

});

module.exports = mongoose.model("usersModel",UsersSchema,"users");
