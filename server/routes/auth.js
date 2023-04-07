const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Users = require('../models/Users')


// Route 1
// Create a new User POST method, Login not req
router.post(
    '/register',async(req, res, next) => {
        try {
            const{fullName, password, email} = req.body;
            if(!fullName || !password || !email){
                res.status(400).send("Fill all the fields")
            }else{
                const isAlreadyExist = await Users.findOne({email});
                if(isAlreadyExist){
                    res.status(400).send("Email already exist")
                }else{
                    const newUser = new Users({fullName, email});
                    bcrypt.hash(password, 10, ((err, hashedPassword)=>{
                        newUser.set('password', hashedPassword  )
                        newUser.save()
                        next();
                    }))
                    return res.status(200).send('User registered successfully')
                }
            }
        } catch (err) {
            console.log(err);
          res.status(500).json({success,  error: "Internal Server Error" });
        }
    }
)

// Route 2
// Login validation POST method, Login req
router.post('/login', async (req, res, next) => {
    try {
      const { password, email } = req.body;
      if (!password || !email) {
        res.status(400).send("Fill all the fields");
      } else {
        const user = await Users.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "Please try to login using correct credentials !!!" });
        } else {
          // Compare password
          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login using correct credentials !!!" });
          } else {
            const payLoad = {
              userId: user._id,
              email: user.email
            };
            const jwtSecretKey = process.env.JWT_SECRET_KEY || 'SecretKey for JWT';
            jwt.sign(payLoad, jwtSecretKey, { expiresIn: 84600 }, async (err, token) => {
              if (err) {
                return res.status(500).json({ error: "Internal Server Error" });
              }
              await Users.updateOne(
                { _id: user._id },
                { $set: { token } }
              );
              res.json({ token });
            });
          }
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  // Route 3
  router.get('/users', async (req, res) => { 
    try {
        const users = await Users.find();
        const userData = [];
        for (let i = 0; i < users.length; i++) {
            userData.push({
                id: users[i]._id,
                user: {
                    email: users[i].email,
                    fullName: users[i].fullName,
                },
                userId: users[i]._id
            });
        }
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  


module.exports = router;