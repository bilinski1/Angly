const router = require("express").Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const { registerValidation, loginValidation } = require('../server/validation')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register route
router.post("/register", async (req, res) => {
  // validate the user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  // checking email 
  const isEmailExist = await User.findOne ({ email: req.body.email });
  if (isEmailExist)
  return res.status(400).json({ error: "Email already exists"});
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);  
  // getting user data
  res.end("Register");
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password,
  });
  // saving to database
  try {
    const savedUser = await user.save();
    res.json({ error: null, data: savedUser });
  } catch ( error ) {
    return res.status(400).json({ error });
  }
});

// login route
router.post("/login", async (req, res) => {

  // validate the user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  // finding user in the database by email
  const user = await User.findOne({ email: req.body.email });
  // throw error when email is wrong
  if (!user) return res.status(400).json({ error: "Email is wrong" });
  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  
  if (!validPassword)
  return res.status(400).json({ error: "Password is wrong" });
  
  // create json web token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );

  res.header("auth-token", token).json({
    error:null,
    data: {
      token,
    },
  });

  res.json({
    error: null,
    data: {
      message: "Login successful",
    },
  });
});


module.exports = router;