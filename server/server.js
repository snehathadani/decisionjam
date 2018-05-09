const bodyParser = require('body-parser');
const express = require ('express');
const server = express();
const mongoose = require('mongoose');
const User = require('./db/UserModel.js');
const Decision = require('./db/DecisionModel.js');
const cors = require('cors');

const jwt = require('jwt-simple');
const passport = require('passport');
const config = require('./config/passport.js')

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_OKAY = 200;
const STATUS_NOT_FOUND = 404;

server.use(cors());
server.use(bodyParser.json());

const payments = require('./Payments.js');
payments(server);

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
            res.status(STATUS_OKAY).json(users);
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
            res.status(STATUS_OKAY).json(user);
        }
    })
});

server.post('/api/decision/create', function(req, res) {
  const newDecision = new Decision (req.body);
  //check the user contains all required data
  newDecision.save((err, decision) => {
      if(err) {
          res.status(STATUS_USER_ERROR).json({error: "Error while adding"});
      } else {
          res.status(STATUS_OKAY).json({decisionId: decision._id});
      }
  })
})

server.get('/api/decision/:id', function(req, res) {
  const id = req.params.id
  Decision.find({_id: id})
          .then ((decision) => res.status(STATUS_OKAY).json(decision),
                 (err) => res.status(STATUS_NOT_FOUND).json({error: "Decision with id " + id + " not found"}));
})

server.put('/api/decision/:id/answer', function(req,res) {
  const id = req.params.id;
  console.log(req.body);
  const answer = req.body.answer; //TODO add with the user id right now only string
  Decision.find({_id: id})
          .then ((decision) => {
                    console.log(decision);
                    let answers = decision.answers;
                    if(answers === undefined) {
                       answers = [{answerText: answer}]; 
                    } else {
                      answers.push({answerText: answer});
                    }
                    Decision.updateOne({_id: id}, {$set: {answers: answers}})
                            .then(result =>  res.status(STATUS_OKAY).json(decision),
                                  err => res.status(STATUS_NOT_FOUND).json({error: "Decision with id " + id + " not updated" +  " " + err}));
                 },
                 (err) => res.status(STATUS_NOT_FOUND).json({error: "Decision with id " + id + " not found"}));          
})





//gotta convert ugly callback code to beautiful promises
//http://erikaybar.name/using-es6-promises-with-mongoosejs-queries/
// route to authenticate a user (POST http://localhost:8080/api/login)
server.post('/api/login', function(req, res) {
    User.findOne({
      $or: [{'email': req.body.emailOrUsername}, {'username': req.body.emailOrUsername}]
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

  /* Handle Logout */
  // nice to have, need to refresh the session on each authorised route so the user
  
  //see last comment https://stackoverflow.com/questions/45541182/passport-req-logout-function-not-working 
server.get('/api/logout', function(req, res) {
  console.log("I am Logout")
  req.logout(); 
  res.status(200).redirect('/');
});


  
  //how to setup routes that need auth as well as test it on postman
  //https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/
  server.get('/api/routeThatNeedsJWTToken', passport.authenticate('jwt', { session: false }), function(req, res){
    res.json("Success! You can not see this without a token");
  });


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
   //'mongodb://localhost/decisionjam');
   'mongodb://sneha.thadani:decisionjam@ds163769.mlab.com:63769/decisionjam');

connect.then(()=> {
   const port= 8000;
   server.listen(port);
   console.log(`Server Listening on ${port}`);
}, (err)=> {
   console.log('could not connect to MongoDB');
});