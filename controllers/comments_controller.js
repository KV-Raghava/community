const Comment = require('../models/comment');
const post = require('../models/post');
module.exports.create = function(req,res){
  post.findById(req.body.post).then(post =>{
    Comment.create({
        content: req.body.content,
        post : req.body.post,
        user:req.user._id
    }).then(comment=>{
        console.log(comment);
        post.comments.push(comment);
        post.save();
        res.redirect('/');
      })
  }).catch(error => {
    console.error(`error in adding comments:${error}`);
    return;
  })
}

module.exports.destroy = function(req,res){
  Comment.findById(req.params.id).then(comment => {
   if (comment.user == req.user.id){
    let postId = comment.post;
    //Comment.findByIdAndDelete(comment._id);
    //comment.remove();
    Comment.findByIdAndDelete(req.params.id).then(promise =>{
    post.findByIdAndUpdate(postId,{$pull :{comments:req.params.id}}).then(promise=>{
      return res.redirect('back');
    })});
   }
   else {return res.redirect('back');}
  }).catch(error => {
    console.log(`error in deleting comment:${error}`);
    return;
  })
}
