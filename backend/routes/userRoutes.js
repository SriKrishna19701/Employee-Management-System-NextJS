const express = require('express');
const router = express.Router();
const User = require('../schema/userSchema');
const { hashPassword, comparePassword } = require('../libs/passwordAuth');

// Create a new user
router.post('/signup', async (req,res)=>{
    try{
        const {username, password, email} = req.body;
        const user = new User({ username, password, email });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });

        hashPassword(password).then(hashedPassword => {
            user.password = hashedPassword;
            user.save();
        }).catch(err => {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Server error' });
        });
    }catch(err){
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Server error' });
    }
})

// login
router.post('login', async (req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await USer.findOne({username,password});
        if(user){
            res.message('Login successful');
        }else{
            res.status(401).json({message:'Invalid credentials'});
        }
    }catch(err){
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error' });
    }
});