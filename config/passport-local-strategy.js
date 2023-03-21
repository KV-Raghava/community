const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
    User.findOne({email:email}).then(user=>{
        if(!user || user.password != password){
            //console.log("Invalid username/password");
            req.flash('error','Invalid username/password');
            return done(null,false);
        }
        else{
            return done(null,user);  
        }

    }).catch(error=>{
        //console.log("error in finding user(in passport)");
        req.flash('error',error);
        return done(error);
    })

}
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
done(null,user.id);
});
//deserializing the user from the key inthe cookies
passport.deserializeUser(function(id,done){
User.findById(id).then(user=>{
return done(null,user);
}).catch(error=>{
    console.log("error in finding user (in passport)");
    return done(error)
})
});
//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
if(req.isAuthenticated()){
    return next();
}
else{
    return res.redirect('/users/sign-in');
}
}
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;