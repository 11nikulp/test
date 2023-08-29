const express = require("express");
const router = express.Router();

const { insertadmin, viewadmin, login } = require("../Controller/adminController");

router.post("/", insertadmin);
router.post("/login", login)
router.get("/", viewadmin);

module.exports = router;
