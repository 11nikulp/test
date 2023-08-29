const exp = require("express");
const app = exp();
const mongoose = require("mongoose");   
    
mongoose
  .connect("mongodb+srv://nikul:nikul123@cluster0.dcrzy7j.mongodb.net/jwt")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error in db" + err);
  });

require("dotenv").config();

const bodyP = require("body-parser");
const cors = require("cors");
app.use(bodyP.json(), bodyP.urlencoded());
app.use(cors());

const adminRouter = require("./Router/adminrouter");
const uploadrouter=require('./Router/uprouter')
app.use("/admin", adminRouter);
app.use('/up',uploadrouter)
app.listen(process.env.PORT, () => {
  console.log("start");
});
