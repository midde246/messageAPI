//Set the Dependencies.....
var express = require('express');
var mongo = require('mongodb').MongoClient;
var session = require('express-session');
var jwt = require ('jsonwebtoken');
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


/* 
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
 */


router.post('/testlogin', function(req, res, next){
   console.log(req.body);
   if(req.body.username == 'midde' && req.body.password == 'midde'){
        const user = req.body.username;
        const token = jwt.sign({user}, 'midde_secrect_key')

        res.json({
            message: "Authenticated! Use this token in the 'Authorization' header", 
            token: token
        });
   }
   else{
       res.json({
           message: "Wrong credential"
       });
   }
});

 
router.get('/checkSession',ensureToken, function(req, res, next){
    
   jwt.verify(req.token, 'midde_secrect_key', function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        description: 'Protected information. Congrats!'
      });
    }
  });

});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
}    

router.get('/logout', function(req, res, next){
    req.session.destroy(function(err){
       if(err){
           console.log("Some error received when to logout");
       }
       console.log("You have got logged out successfully");
       res.send("You have got logged out successfully");
    });

});
 
module.exports = router;