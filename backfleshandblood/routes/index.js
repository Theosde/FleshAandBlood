var express = require('express');
var router = express.Router();


var productModel = require('../models/productModel');

var arcModel = require('../models/editions/arcModel');
var cruModel = require('../models/editions/cruModel');
var monModel = require('../models/editions/monModel');
var wtrModel = require('../models/editions/wtrModel');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/wtrCardsBrand', function(req, res, next) {

  wtrModel.find(function(error,cards){

    cards.forEach(element => {
      console.log(element.name);
      wtrModel.findOneAndUpdate(
        {"name":element.name},
        {"brand": "wtr"},
        {new:true},
        function(error,cardupdate){
        }
        )
      });

      //res.json({cards})


  })
});


/* -------- POST Box and Booster d'une edition  -------- */

router.post('/productSealed', function(req, res, next) {
  productModel.find({edition:req.body.edition},function(error,productSealed){
    console.log(productSealed);
    console.log(req.body.edition);
    res.json({productSealed})
  })
});

module.exports = router;


/* -------- GET Carte par Edition -------- */

router.get('/arcCards', function(req, res, next) {
  arcModel.find(function(error,cards){
    res.json({cards})
  })
});

router.get('/cruCards', function(req, res, next) {
  cruModel.find(function(error,cards){
    res.json({cards})
  })
});

router.get('/monCards', function(req, res, next) {
  monModel.find(function(error,cards){
    res.json({cards})
  })
});

router.get('/wtrCards', function(req, res, next) {
  wtrModel.find(function(error,cards){
    res.json({cards})
  })
});

/* -------- POST Verif des quantity dans la bdd avant achat -------- */

router.post('/verifQuantityBDD', async function(req, res, next) {
  var order = req.body.panier
  console.log(order);

  var listEdition = []
  order.forEach(element => {
    listEdition.push(element.brand)
    
  });
  console.log(listEdition);

  var errorStock = [];

  for (let i = 0; i < order.length; i++) {

    if(order[i].brand == "arc"){

      await arcModel.findOne({"name":order[i].title}, function(error,cards){
        var diffQuantity = cards.quantity - order[i].quantity
        if (diffQuantity < 0 ) {
          console.log("Pas assez de SOTCK");
          var manque = order[i].quantity - cards.quantity
          // gestion error ==> pas assez de carte en stock
          errorStock.push(order[i].title)
        }
      })

    }else if (order[i].brand == "cru") {

      await cruModel.findOne({"name":order[i].title}, function(error,cards){
        var diffQuantity = cards.quantity - order[i].quantity
        if (diffQuantity < 0 ) {
          console.log("Pas assez de SOTCK");
          var manque = order[i].quantity - cards.quantity
          // gestion error ==> pas assez de carte en stock
          errorStock.push(order[i].title)
        }
      })
      
    }else if (order[i].brand == "mon") {

      await monModel.findOne({"name":order[i].title}, function(error,cards){
        var diffQuantity = cards.quantity - order[i].quantity
        if (diffQuantity < 0 ) {
          console.log("Pas assez de SOTCK");
          var manque = order[i].quantity - cards.quantity
          // gestion error ==> pas assez de carte en stock
          errorStock.push(order[i].title)
        }
      })
      
    }else if (order[i].brand == "wtr") {

      await wtrModel.findOne({"name":order[i].title}, function(error,cards){
        var diffQuantity = cards.quantity - order[i].quantity
        if (diffQuantity < 0 ) {
          console.log("Pas assez de SOTCK");
          var manque = order[i].quantity - cards.quantity
          // gestion error ==> pas assez de carte en stock
          errorStock.push(order[i].title)
        }
      })
      
    }

  }

  
  res.json({result:true, errorStock})



});




