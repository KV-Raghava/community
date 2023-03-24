const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = function (req,res){
    User.findById(req.params.id)
    .then(user=>{
        return res.render('users',{
            title:'users profile dummy page',
            profile_user:user
        });
    });
    //return res.render('users',{title:'users profile dummy page'});
}



module.exports.update = async function(req, res){
   
    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){

                   if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }


    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}
module.exports.signUp = function(req,res){
    //if user has already logged in,take user to profile
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title: "community | sign up"
    })
}

module.exports.signIn = function(req,res){
    //if user has already logged in,take user to profile
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    req.flash('success','Logged in successfully');
return res.redirect('/');
}

module.exports.destroySession = function(req,res){

        req.logout(function(err) {
            if (err) { return next(err); }
            req.flash('success','Logged out successfully');
            return res.redirect('/');
          });
    //passport gives this function to req
    //return res.redirect('/');
}