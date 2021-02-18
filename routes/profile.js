const express = require('express');
const router = express.Router();
const verifyToken = require("../server/validate-token");
const Profile = require('../models/Profile');
const User = require('../models/User');

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private


router.get('/me', verifyToken, async (req, res) => {
    try {
        const profile =  await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
   
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);
   
    }   catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router; 
