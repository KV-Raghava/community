const Post = require('../models/posts');

module.exports.create = function(req, res){
    /*console.log(req.user);
    return res.redirect('back');*/
    //if user is not logged in,redirect him to sign-in page
    if(!req.user){return res.redirect('/users/sign-in');}
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(user=>{
        return res.redirect('back');
    }).catch(error=>{
        console.log('error in creating a post');
         return;
    })
}
