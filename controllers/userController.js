const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//@desc Register a user
//@route POST /api/users/register

const registerUser = asyncHandler (async (req,res) => {

    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(400)
        throw new 
Error ('All field is mandatory!')
    }

    const userAvailable = await User.findOne({email})  //email - to find the user already exist
    if(userAvailable){
        res.status(400)
        throw new Error ('user already registered!')
    }

    //hash password

    const hashedPassword = await bcrypt.hash(password,10);
    console.log('Hashed Password:', hashedPassword)

    //user created
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    })

    console.log(`user created ${user}`)
    if(user){                  //if - user created successfully

        res.status(201).json({_id: user.id, email: user.email})
    } else {

        res.status(400)
        throw new Error('User data is not valid')
    }

    res.json({message: 'Register The User'})
})



//@desc Login  user
//@route POST /api/users/login

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email); // Log email for debugging

    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }

    const user = await User.findOne({ email });

    console.log('User found:', user); // Log user for debugging

    if (user) {
        console.log('Stored hashed password:', user.password); // Log stored hashed password for debugging
        const passwordMatch = await bcrypt.compare(password, user.password);

        console.log('Password comparison result:', passwordMatch); // Log password comparison result for debugging

        if (passwordMatch) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.status(200).json({ accessToken });
        } else {
            res.status(401);
            throw new Error('Email or password not valid');
        }
    } else {
        res.status(401);
        throw new Error('Email or password not valid');
    }
});



/*
const loginUser = asyncHandler (async (req,res)=>{


    const {email, password} = req.body;
    //console.log('Login attempt with email:', email); // Log email for debugging
    //console.log('Password:', password);


    if (!email || !password) {
        res.status(400)
        throw new Error('All field are mandatory')
    }

    const user = await User.findOne({email})    //to check user email address available on database

    if (user && (await bcrypt.compare (password, user.password))) {

        const accessToken = jwt.sign({         //payload method using from jwt.io
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },

        }, process.env.ACCESS_TOKEN_SECRET,
           {expiresIn: '1m'}
        );


        res.status(200).json({accessToken})
    }   else {
        res.status(401)
        throw new Error('email or password not valid')
    }
}) 

*/


//@desc Login  user
//@route POST /api  /users/login


const currentUser = asyncHandler (async (req,res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}
