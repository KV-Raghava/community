const User = require('../models/user');
module.exports.profile = function (req,res){

    return res.render('users',{title:'users dummy page'});
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "community | sign up"
    })
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "community | sign in"
    })
}

//getting signup data
module.exports.create = function(req,res){
    //TODO LATER
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            User.create(req.body).then(promise=>{
                return res.redirect('/users/sign-in');
            }).catch(err => {
                console.log('error in creating user while signing up');
                return;
            })
        }
        else{
            return res.redirect('back');
        }
    }).catch(error=>{
        console.log('error in finding user during sign up');
        return;
    })
}
//sign in and create session
module.exports.createSession = function(req,res){

}