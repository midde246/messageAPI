//Set the Dependencies.....
var express = require('express');
var mongo = require('mongodb').MongoClient;
var session = require('express-session');
var router = express.Router();

//Database url set
var _dbUrl = 'mongodb://localhost:27017/EMS';
var _Rurl = 'mongodb://midde:midde@ds259325.mlab.com:59325/midde';

//testing get route
router.get('/', function(req, res, next){
    res.render('index');
});

// Signup API route....
/* router.post('/signup', function(req, res, next){
     //console.log(req.body);
     
     //connect to database 
     mongo.connect(_dbUrl, function(err, db){
         if(err){
             console.log("Problem in connecting DataBase");
         }
         db.collection('Employees').insert(req.body, function(err, result){
             if(err){
                 console.log("Problem on inserting to DataBase");
             }
             db.close();
             console.log("Inserted Successfully !!");
             res.sendStatus(200);
         })
     });   
}); */

//Signin API route......
/* router.post('/signin', function(req, res, next){
    mongo.connect(_dbUrl, function(err, db){
        if(err){
            console.log("Problem in connecting with DataBase");
        }
        //console.log("database connected");
        db.collection('Employees').find({
            $and: [
                {"email" : req.body.email},{"password": req.body.password}
            ]
        }, function(err, result){
            if(err){
                console.log("Error in finding data...");
            }
            console.log("database sending data successfully");
            //console.log(result);
            result.forEach(function(element, err) {
                if(err){
                    console.log("Problem on extracting data")
                }
               console.log("Here I am !!"); 
               console.log(element.email + " " + element.name);  
               res.send(element.name);
               console.log(element.name);
            });             
        });       
    });
}); */

//test APi with session ....
/* router.post('/demologin', function(req, res, next){
     
    console.log("HI "+req.body.name+" ! How are you ?");
}); */

router.get('/message',function( req, res, next){
     resultArray = []
     //connect to database with remote 
     mongo.connect(_Rurl, function(err, db){
        if(err){
            console.log("Problem in connecting DataBase");
        }
        var result = db.collection('message').find()
        //console.log(result);
        result.forEach(function(msg, err){
              if(err){
                  console.log(" Problem on extracting data")
              }
              //console.log(msg);
              resultArray.push(msg)             
        },function(){
            res.send(resultArray);
            //console.log(resultArray[1]);
          });        
    });   
    //res.send();
    //console.log(resultArray[0]);
});

router.post('/insertMessage', function(req, res, next){
    //console.log(req.body);
    
    //connect to database 
    mongo.connect(_Rurl, function(err, db){
        if(err){
            console.log("Problem in connecting DataBase");
        }
        db.collection('message').insert(req.body, function(err, result){
            if(err){
                console.log("Problem on inserting to DataBase");
            }
            db.close();
            console.log("Inserted Successfully !!");
            res.sendStatus(200);
        })
    });   
});


router.post('/testlogin', function(req, res, next){

   // console.log(req.body);
   if(req.body.username == 'admin' && req.body.password == 'admin'){
       console.log("Welcome "+req.body.username);
       res.send("Welcome "+req.body.username);
       req.session.authenticated = true;
       req.session.username = req.body.username;
       req.session.password = req.body.password;
       console.log("Set session as "+req.session.username);
       session.save() 
   }
   else {
       res.send("Who are you ?? ");
       console.log("Who are you ?? ");
   }
    
});

router.get('/checkSession', function(req, res, next){
   //console.log(req.session); 
   if(req.session.authenticated == true){
      console.log(req.session.username);  
   } 
   else{
       console.log("session is not SET");
   }
});
 
module.exports = router;