const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

router.post("/auth/signup", async (req, res) => {
    const isEmailExist = await User.findOne({ email: req.body.email });
  
    if (isEmailExist) return res.status(400).json({ error: "Email already exists" });
  
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
  
    const user = new User({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      password,
    });
  
    try {
      const savedUser = await user.save();
      const accessToken = jwt.sign({userID: savedUser._id, role: savedUser.role}, JWT_SECRET, {expiresIn: '1800s'});

      res.status(201).json({ error: null, data: { accessToken } });
    } catch (error) {
      res.status(400).json({ error });
    }
  });

router.post('/auth/signin', async (req, res) => {

    try {

        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) return res.status(400).json({ error: "User does not exist." });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: "Wrong password." });

        const accessToken = jwt.sign({userID: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1800s'});

        res.status(200).json({ error: null, data: { accessToken,} });

    } catch(error) {
        res.status(400).json({ error: error })
    }
    
});

module.exports = router;

