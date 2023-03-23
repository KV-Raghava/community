const Post = require('../models/post');
const Comment = require('../models/comment')
module.exports.create = function(req, res){
    /*console.log(req.user);
    return res.redirect('back');*/
    //if user is not logged in,redirect him to sign-in page
    if(!req.user){return res.redirect('/users/sign-in');}

    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(user=>{
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: user
                },
                message:'postcreated'
            });
        }
        req.flash('success','post published!');
        return res.redirect('back');
    }).catch(error=>{
        //console.log('error in creating a post');
        req.flash('error',error);
         return;
    })
}

module.exports.destroy =async function(req,res){
    try{
        let post = await Post.findById(req.params.id)
        //.id means converting object id into string format
        if(post.user == req.user.id){
            //post.remove();
            
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({post :req.params.id});
            req.flash('success','post deleted');
            return res.redirect('back');
            
            
        }
        else{
            return res.redirect('back');
        }
    }catch(error){
        console.log(`error:${error}`);
        return res.redirect('back');
    }
    
}
