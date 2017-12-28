//Set all dependencies....
var express = require('express');
var mongo = require('mongodb').MongoClient;
var router = express.Router();


//Data base url set
var _url = 'mongodb://localhost:27017/demo';
var _Rurl = 'mongodb://midde:midde@ds259325.mlab.com:59325/midde';

//GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
  
});

//Test api route
router.get('/students', function(req, res, next){

   var student = [{
     name: "Sarada Prasad Midde",
     town: "tarakeshwar",
     age:24
   },
   {
    name: "Rahul Banerjee",
    town: "Durgapur",
    age:26
   },
   {
    name: "Reshma Khatun",
    town: "Bankura",
    age:22
   }]

   res.json(student);
});


//Test api with mongodb.....
router.get('/midde', function(req, res, next){
    resultArray = [];
    //Database connection....
    mongo.connect(_url, function(err, db){
      if(err){
        res.send(err);
      }
      var dataSet = db.collection('user').find();
     // res.send(dataSet); 
     //console.log(dataSet);
     dataSet.forEach(function(result, err){
        if(err){
          console.log("Error occured when exracting data...");
        }
         resultArray.push(result);
     }, function(){
      db.close();
      //console.log(resultArray);
      res.json(resultArray);
     });
    });
    //res.json(resultArray);      
  });


  router.post('/employee', function(req, res, next){

    console.log(req.body);
    //Connect the Database
    mongo.connect(_url,function(err, db){
      if(err){
        console.log("Error in database Connection");
      }
       db.collection('employee').insertOne(req.body, function(err, result){
         if(err){
           console.log("Problem on inserting to database...");
         }
         db.close();
         console.log("Inserted successfully..");
         res.sendStatus(200);
       });
    });
  });

  router

module.exports = router;
