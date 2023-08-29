const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        name :{
            type: String,
			required: true,
			trim: true,
			maxlength: 30,
			minlength: 3,
        }
        ,
        email:{
            type: String,
			required: true,
			trim: true,
			maxlength: 60,
			unique: true,
        },
        password:{
            maxlength: 20,
			type: String,
			required: true,
			trim: true,
        },
        mobile:{
            type: Number,
			required: true,
			unique: true,
        },
        image:{
            type: String,
			required: true,
			maxlength: 255,
        },
        document:{
            type: [String],
			required: true,
        }

    }
);
userSchema.pre('save',function(next)
{
    var user=this ;
    if(!user.isModified("password")){
        return next();

    }bcrypt.genSalt(10,function(err,salt){
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt, function(err,hash){
            if(err){
                return next(err)
            }
            user.password=hash;
            next()
        })
    })

})
userSchema.methods={
    comparepassword:function(pass,cb){
        bcrypt.compare(this.password,pass, function(err,isMatch){
            if(err){
return cb(err,false);
            }
            return cb(null,isMatch)

        })

    }
}
module.exports = mongoose.model("updata", userSchema);
