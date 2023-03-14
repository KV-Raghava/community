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
}
//sign in and create session
module.exports.createSession = function(req,res){

}