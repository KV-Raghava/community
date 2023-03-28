const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession = async function(req,res){
    try{
    let user = await User.findOne({email:req.body.email});
    if(!user || user.password != req.body.password){
        return res.json(422,{
            message : 'invalid username or password'
        })

    }
    return res.status(200).json({
        message : 'sign in successful,here is your token',
        data : {
            token : jwt.sign(user.toJSON(),'codeial',{expiresIn : '1000000'})
        }
    });
    }catch(error){
        console.log(`error in creating post : ${error}`);
        return res.json(500,{
            message : 'internal server error'
        })
    }
}