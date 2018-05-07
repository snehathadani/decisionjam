
//https://devdactic.com/restful-api-user-authentication-1/
// https://stackoverflow.com/questions/36533767/nodejs-jwtstrategy-requires-a-function-to-retrieve-jwt-from-requests-error
const JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
 
// load up the user model
const User = require('../db/UserModel');

 
module.exports = function(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  
  opts.JWT_ALLOW_REFRESH = true;
  opts.expiresIn = 900; // set session time to expire in 15 mins
  opts.secretOrKey = 'cs5Rocks';
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};