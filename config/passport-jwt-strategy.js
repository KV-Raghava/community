const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

//decoding and getting user id into user
passport.use(new JWTStrategy(opts,async function(jwtPayLoad, done){
    try{
    let user = await User.findById(jwtPayLoad._id);
    if (user){
      //console.log(user);
        return done(null, user);
    }else{
        return done(null, false);
    } 
  }catch(error){
    console.log(`Error in finding user from JWT : ${error}`); 
    return;
  }
}));

module.exports = passport;
