const router = require("express").Router();
const User = require('../models/User');

router.post("/register", async (req, res) => {
  res.end("Register");
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.json({ error: null, data: savedUser });
  } catch ( error ) {
    return res.status(400).json({ error });
  }
});

module.exports = router;