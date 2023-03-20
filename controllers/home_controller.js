const Post = require('../models/post');
const User = require('../models/user');
//module.exports.actionName = function(req,res){}

module.exports.home = function(req,res){
    //console.log(req.cookies);
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:'user'
    }).then(posts=>{
        User.find({})
        .then(users=>{
            return res.render('home',{
                title:'Home page',
                posts:posts,
                all_users:users
            });
        })
        
    }).catch(error=>{
        console.log('error in fetching posts');
        return;});
    //return res.render('home',{title:'Home page'});
}