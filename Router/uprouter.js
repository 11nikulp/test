const express= require('express')
const add=require("../Controller/uploaddata")

const router=express.Router()
router.post('/upload',add)
module.exports=router   