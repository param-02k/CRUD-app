const express = require("express")
const userRouter = express.Router();
const {registeruser, loginuser, getuser, logout, deleteuser} = require("../controllers/userController")

userRouter.post('/registerdata',registeruser )

userRouter.post('/logindata',loginuser )

userRouter.get("/getuserdata", getuser)

userRouter.get("/logout", logout)

userRouter.post("/deleteuser", deleteuser)

module.exports = userRouter