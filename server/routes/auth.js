const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user)
      return res.status(400).json({ success: false, message: 'User not found' })
    res.json({ success: true, user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
})

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  // Simple Validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' })
  }

  try {
    //Check for existing user
    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({ success: false, message: 'Username already taken' })
    }

    // Passed Check
    const hasedPassword = await argon2.hash(password)
    const newUser = new User({ username, password: hasedPassword })
    await newUser.save()

    // All Passed => Return token
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)

    res.json({ success: true, message: 'User Successfully Register', accessToken })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Has Problem" })
  }
})

//Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  // Simple Validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' })
  }

  try {
    //Check for existing user
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ success: false, message: 'Incorrect Username' })
    }

    // Passed Check
    const passwordValid = await argon2.verify(user.password, password)
    if (!passwordValid)
      return res.status(400).json({ success: false, message: 'Incorrect Password' })

    // All Passed => Return token
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)

    res.json({ success: true, message: 'User Successfully Login', accessToken })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Has Problem" })
  }
})

module.exports = router;