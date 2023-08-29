const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		unique:true,
		maxlength: 10,
		minlength: 3,
	},
	mobile: {
		required: true,
		type: Number,
	},
	email: {
		required: true,
		unique: true,
		type: String,
		maxlength: 50,
		minlength: 10,
	},
	password: {
		type: String,
		required: true,
		maxlength: 8,
	},
	// isadmin : true
});

adminSchema.pre('save', function(next){
	const user = this
	if(!user.isModified('password')){
		return next()
	}
	bcrypt.genSalt(10,function(err,salt){
		if(err){
			return next(err)
		}
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err){
				return next(err)
			}
			user.password = hash
			next();
		})
	})
})

adminSchema.methods = {
	'comparepwd' : function(pwd , cb){
		bcrypt.compare(pwd, this.password, function(err, isMatch){
			if(err){
				return cb(err,false)
			}
			else{
				return cb(null, isMatch)
			}
		})
	}
}

module.exports = mongoose.model("adminusers", adminSchema);
