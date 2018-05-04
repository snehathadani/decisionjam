const bodyParser = require('body-parser');
const express = require ('express');
const server = express();
const mongoose = require('mongoose');
const User = require('./db/UserModel.js');
const cors = require('cors');
const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('./config/passport.js')

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_OKAY = 200;

server.use(cors());
server.use(bodyParser.json());
server.use(passport.initialize());
// pass passport for configuration
require('./config/passport')(passport);


server.get ('/', function (req, res) {
   res.status(200).json ({message: 'API running'});
});

server.get ('/api/users', function (req, res) {
  User.find({},(err, users)=> {
        if (err) {
        res.status(STATUS_USER_ERROR).json({error:'Could not find the user.'});
        } else {
            res.status(200).json(users);
        }
  })
});

server.post('/api/users/adduser', function(req, res) {
    const newUser = new User (req.body);
    //check the user contains all required data
    if(!newUser.username || !newUser.password || !newUser.email) {
        res.status(400).json('missing required info');
        return;
    }
    newUser.save((err, user) => {
        if(err) {
            res.status(STATUS_USER_ERROR).json({error: "Error while adding", err});
        } else {
            res.status(200).json(user);
        }
    })
});

// route to authenticate a user (POST http://localhost:8080/api/login)
server.post('/api/login', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
   
      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        console.log (user.password, req.body.password);
        user.comparePassword(req.body.password, function (err, isMatch) {
          console.log(isMatch);
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.encode(user, 'cs5Rocks');
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.send({success: false, msg: 'Authentication failed. Wrong password.', err });
          }
        });
      }
    });
  });
  
  //how to setup routes that need auth as well as test it on postman
  //https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/
  server.get('/api/routeThatNeedsJWTToken', passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
  });

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
   'mongodb://localhost/decisionjam');
   //mongodb://sneha.thadani:decisionjam@ds163769.mlab.com:63769/decisionjam

connect.then(()=> {
   const port= 8000;
   server.listen(port);
   console.log(`Server Listening on ${port}`);
}, (err)=> {
   console.log('could not connect to MongoDB');
});
