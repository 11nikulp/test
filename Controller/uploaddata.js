const uploadschema=require('../Model/uploadschema')
const multer = require("multer");
const path= require("path");
 
let storage= multer.diskStorage({
    destination: (req,res,pr)=>pr(null,"uploads"),
    filename: async (req,file,pr)=>{
        pr(null,Date.now()+"-"+file.originalname)
    }
})
let upload= multer({
storage,
    
}).fields(  [
    {
        name: "documents", maxCount: 7 
    },
    {name: "image",maxCount:1}
])

const add= async (req,res)=>{
try{
    await upload(
        req,res,(err)=>{
     if(!req.files){
        return res.json({error:"atech file !!!!"   })
     }
     if(err){
        return res.status(500).send({
            err:err.message
        })
     }
     let list=[];
     for(let up_Data of req.files["documents"]){
        list.push(up_Data.path)
     }
     const galleryfile=req.files ["image"][0].path;
     const obj ={...req.body,image:galleryfile,documents:list};
     const user= new uploadschema(obj)
     console.log(obj.documents)
     user.save().then((result)=>{
return res.json(result)
     }).catch((err)=>{
        return res.json({ msg: err });
     })
        }
    )
}catch(err){
res.json(err)
}
}
module.exports=
    add