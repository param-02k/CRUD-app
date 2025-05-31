const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const user = require("../models/userModel.js")


const registeruser = async (req, res) => {
    let { username, password } = req.body
    console.log(username, "=> ", password);
    
    // check if username is empty => send negative response
    if (!username) {
        res.json({
            statusCode: 404,    // username not found
            message: "username is required !!",
            success: false,
            data: {}
        })
        return
    }

    // check if password is empty => send negative response
    if (!password) {
        res.json({
            statuscode: 404,
            message: "password is required",
            success: false,
            data: {}
        })
        return
    }
       password =  await bcrypt.hash(password, 10);
    // localStorage["username"] = username;
    // localStorage["password"] = password;

    // create user to save into db
    const createdUser = await user.create({
        username,
        password
    })

    if(!createdUser){
        res.json({
            statusCode: 500,
            message: "Failed creating a user",
            success: false,
            data: {}
        })
    }

    // if everyting is there send the success response
    res.json({
        statuscode: 200,
        message: "Registered succesfully",
        success: true,
        data: {}
    })

}


const loginuser = async(req, res) => {
    let {username, password} = req.body

    console.log(username + "   " + password);
    

    if (!username) {
        res.json({
            statusCode: 404,    // username not found
            message: "username is required !!",
            success: false,
            data: {}
        })
        return
    }

    if (!password) {
        res.json({
            statuscode: 404,
            message: "password is required",
            success: false,
            data: {}
        })
        return
    }

     // get items from database
    
     // let unameFromDB = localStorage["username"]
     // let passFromDB = localStorage["password"]
     const dbdata = await user.findOne({username})
     console.log(dbdata.username);
     

    // check if db username and fe username is same 
    if (dbdata.username != username) {
        res.json({
            statuscode: 404,
            message: "username not matched",
            success: false,
            data: {}
        })
        return
    }
    if (dbdata.username === username) {
        if (! await bcrypt.compare(password,dbdata.password)) {
            res.json({
                statuscode: 404,
                message: "password not matched",
                success: false,
                data: {}
            })
            return
        }else {

            const userData = {
                "uname": dbdata.username,
                "pass": dbdata.password
            }

            // feed userData into jwt
            const token = jwt.sign(userData, "param", { expiresIn: '1h' });

            console.log(token);
            
            res.cookie("udetails", token, {
                maxAge: 3600000,
                httpOnly: true,
                secure: true
            })
            .status(200).json({
                statuscode: 200,
                message: "Login succesfully",
                success: true,
                data: {
                    username: dbdata.username,
                    pass: dbdata.password  // we generally don't send this
                }
            })
        }
    }
}

const getuser = (req, res)=>{
    let reqCookie = req.cookies

    if(!reqCookie){
        req.json({
            statusCode: 404,
            message: "No cookies found, login again !!",
            success: false,
            data: {}
        })
    }
    let token = reqCookie.udetails
    console.log(token);
    

    let {uname, pass} = jwt.verify(token, "param");
    console.log(`${uname}     ${pass}`);
    

    // if no uname, return negative response

    res.json({
        statusCode : 200,
        message: "User Found Successfully",
        success: true,
        data: {
            uname, 
            pass
        }
    })

}

const logout =  (req,res)=>{
    res.clearCookie("udetails")
    res.json({
        statuscode : 200,
        message: "LogOut Successfully",
        success: true,
        data : {}
})}

const deleteuser = (req, res) => {
    // get user name from cookies and send to db to delete the user
}

module.exports = {registeruser, loginuser, getuser, logout, deleteuser}