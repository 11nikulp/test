const adminModel = require("../Model/adminm");
const jwt = require("jsonwebtoken")

const insertadmin = (req, res) => {
	const user = new adminModel(req.body);
	user.save()
		.then((result) => res.json(result))
		.catch((err) => res.json(err));
};

const viewadmin = (req, res) => {
	adminModel
		.find()
	 	.then((result) => res.json(result))
		.catch((err) => res.json(err));
};
const login = (req,res) =>{
	const {username, password} = req.body
	adminModel.findOne({username: username}).then((reslt) => {
		if(!reslt){
			res.json({msg: "Wrong Username"})
		}
		reslt.comparepwd(password, (err, success)=>{
			// console.log(reslt)
			if(err){
				res.json({msg : "Invalid Password"})
			}
			if(success){
				const token =  jwt.sign(
					{
						role : "admin",
						_id : reslt.id
					},
					process.env.SECRET,
					{
						expiresIn : "1d"
					}
				)
				res.json({msg : "Welcome", token})

			}
			else{
				res.json({msg : "Wrong Password"})
			}
		})
	}).catch((err) => {
		res.json({msg : "Invalid Username"})
	})
}


const logins = (req,res) => {
	const {uname, pwd} = req.body
	adminModel.findOne({username : uname}).then(reslt => {
		if(!reslt){
			res.json({msg : "Wrong Username"})
		}
		reslt.comparepwd(pwd,(err,success)=>{
			if(err){
				res.json({msg : "Invalid Password"})
			}
			if(success){
				const token =  jwt.sign(
					{
						role : "admin",
						_id : reslt.id
					},
					process.env.SECRET,
					{
						expiresIn : "1d"
					}
				)
				res.json({msg : "Welcome", token})
			}
			else{
				res.json({msg : "Wrong Password"})
			}
		})
	}).catch(err => res.json({msg : "Invalid Username"}))
}

module.exports = { insertadmin, viewadmin, login };
