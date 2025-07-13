const jwt = require('jsonwebtoken');
const User = require("../models/User");

// generate JWT token 
const generateToken = (id) => {
    return jwt.sign(
        {id}, 
        process.env.JWT_SECRET, 
        {expiresIn: '1h'});
};

// register user
exports.registerUser = async (req, res) => {
    const {fullName, email, password, profileImageUrl} = req.body;

    // validate user
    if( !fullName || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        // if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({message: "Email already exists. Please login."});
        }

        // create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });
        
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error registering user", error: error.message});
    }
};

// login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    // validate user
    if(!email || !password) {
        return res.status(400).json({message: "Email and password are required"});
    }

    try{
        // find user
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) {
            return res.status(404).json({message: "Invalid email or password"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error logging in user", error: error.message});
    }
};

// get user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");  // exclude password from response

        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Error fetching user info", error: error.message});
    }
};