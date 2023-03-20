const Post = require('../models/post');

//module.exports.actionName = function(req,res){}

module.exports.home = function(req,res){
    //console.log(req.cookies);
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:'user'
    }).then(posts=>{
        return res.render('home',{
            title:'Home page',
            posts:posts});
    }).catch(error=>{
        console.log('error in fetching posts');
        return;});
    //return res.render('home',{title:'Home page'});
}