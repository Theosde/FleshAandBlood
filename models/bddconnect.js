const mongoose = require('mongoose');

const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

var user =  "fabadmin";
var password = "fab";
var dataBase = "fleshandblood";

mongoose.connect('mongodb+srv://fabadmin:fab@clusterfleshandblood.guxky.mongodb.net/fleshandblood?retryWrites=true&w=majority',
options,
function(error){
    console.log('Connection OK !')
});



module.exports = mongoose;