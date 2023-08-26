
const User = require("../models/authmodel.js");
const bcrypt = require("bcrypt");
// const LocalStrategy = require('passport-local').Strategy;

exports.registerControllers = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;

        console.log(name, email, password);

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }) 
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(409).json({
                success: false,
                message: "User already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name, 
            email, 
            password: hashedPassword, 
        });
        // const userid = newUser._id;
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            // userid: userid,
            user: newUser
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}


exports.loginControllers = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        console.log(email, password);
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
    
        const user = await User.findOne({ email });
        
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }

        delete user.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            userid: user._id, 
            user,
    
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// exports.logout = async (req, res) => {

//   // Assuming you're using sessions, you can destroy the session here
//   req.session.destroy();

//   res.json({ message: 'Logged out successfully' });
// };