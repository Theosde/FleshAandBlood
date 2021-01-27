var express = require('express');
var router = express.Router();


var usersModel = require('../models/usersModel');


var SHA256 = require("crypto-js/sha256")
var encBase64 = require("crypto-js/enc-base64")
var uid2 = require("uid2")



/* -------- POST Inscription -------- */

router.post('/signup', function(req, res, next) {

  var myPassword = req.body.password;
  var salt = uid2(32);

  var myPasswordHacke = SHA256(myPassword + salt).toString(encBase64);

  console.log(req.body);

  usersModel.findOne({email:req.body.email},function(error,findUser){
    if (findUser) {
      res.json({result:false, error:"cette email est déja lie a un compte"})
    }else {

      var newUser = new usersModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: myPasswordHacke,
        salt: salt,
        adress: {street:"",zip:"",city:"",country:""},
        historic: [],
      });

      newUser.save(function(error, user) {
        if(error) {
          console.log(error);
        }else {

          res.json({user, result:true, error:""})

          /*
          usersModel.findOne({"email":req.params.email})
          .populate({path: 'historic'})
          .exec(function (err, findUser) {
            res.json({user:findUser})
          })
          */

        }
      });
    }

  });

});

/* -------- POST Connection -------- */

router.post('/signin', function(req, res, next) {
  console.log(req.body);
  usersModel.findOne({email:req.body.email},function(error,findUser){
    console.log(findUser);
    if (findUser != null) {

      var mdp = SHA256(req.body.password + findUser.salt).toString(encBase64);

      console.log(findUser.salt);
      console.log(mdp);
      console.log(findUser.password);

      if (findUser.password === mdp ) {
        console.log("password ok");

        res.json({user:findUser, result:true, error:""})

      }else {
        console.log("password fail");
        res.json({result:false, error:"password"})
      }

    }else {
      res.json({result:false, error:"email"})
    }
  });
})


/* -------- POST Save Historic Command -------- */

router.post('/saveCommand', function(req, res, next) {
  usersModel.findById(req.body.idUser,function(error,findUser){

    if(findUser == undefined){
      console.log("user not find");
      res.json({error:"user non trouvé"})

    }else{
      console.log("user find");

      var dateNow = Date.now()
      var historiComand = findUser.historic

      // Ajout du panier dans historic
      historiComand = [...findUser.historic, {
        date: dateNow,
        total: req.body.total,
        article: [req.body.panier],
        status: "Paid",
        fdp: req.body.ftp,
        adress: findUser.adress.street + " " + findUser.adress.zip + " " + findUser.adress.city + " " + findUser.adress.country,
        buyername: findUser.firstname + " " + findUser.lastname,
        buyeremail: findUser.email
       }]

      // Modifier BDD
      usersModel.findOneAndUpdate(
        {"_id":req.body.idUser},
        {"historic":historiComand},
        {new:true},
        function(error,userupdate){
         res.json({user:userupdate})
        }
      )

    }

  })

});

/* -------- POST Save Adress de livraison -------- */

router.post('/updateAdresseLivraison', function(req, res, next) {

  // Modifier BDD
  usersModel.findOneAndUpdate(
    {"_id":req.body.idUser},
    {"adress":{street:req.body.street,zip:req.body.zip,city:req.body.city,country:req.body.country}},
    {new:true},
    function(error,userupdate){
    res.json({result:true,user:userupdate})
    }
  )

});


module.exports = router;
