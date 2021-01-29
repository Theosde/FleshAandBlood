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
      res.json({result:false, error:"This Email has already been used"})
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
        res.json({result:false, error:"Wrong password"})
      }

    }else {
      res.json({result:false, error:"This Email is not valid"})
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
        article: req.body.panier,
        status: "Your order is being processed",
        fdp: req.body.ftp,
        adress: findUser.adress.street + " " + findUser.adress.zip + " " + findUser.adress.city + " " + findUser.adress.country,
        buyername: findUser.firstname + " " + findUser.lastname,
        buyeremail: findUser.email,
        deliveryname: req.body.deliveryfirstname + " " + req.body.deliverylastname
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

/* -------- GET all users -------- */

router.get('/getUsersList', function(req, res, next) {
  usersModel.find(function(error,usersList){

    var historicAllOrder = []

    usersList.forEach(e => {
      if (e.historic.length != 0) {
        e.historic.forEach(i => {
          if (i.status === "Your order is being processed") {
            historicAllOrder.push(i)
          }
        })
      }
    })

    res.json({historicAllOrder})
  })
});


/* -------- POST admin change status order -------- */

router.post('/changeStatusOrder', function(req, res, next) {

  console.log(req.body.email);
  console.log(req.body.idOrder);

  usersModel.findOne({"email":req.body.email},function(error,findUser){
    console.log(findUser);

    var commandeChange = findUser.historic.find(e=> e._id == req.body.idOrder)
    if (commandeChange != undefined) {


      var newHistoric = findUser.historic.filter(histo => histo._id != req.body.idOrder )


      commandeChange.status = "your order has been sent "
      console.log("commandeChange",commandeChange);
      newHistoric.push(commandeChange)
      console.log("newHistoric",newHistoric);

    }

    usersModel.findOneAndUpdate(
      {"_id":findUser._id},
      {"historic":newHistoric},
      {new:true},
      function(error,userupdate){
      res.json({result:true,user:userupdate})
      }
    )

  })
});

module.exports = router;
