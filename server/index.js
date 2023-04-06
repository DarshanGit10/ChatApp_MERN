const express =  require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// DB
const connectToMongo = require('./db')
connectToMongo();

// Import files
const app = express();
const Users = require('./models/Users')

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) =>{
    res.send('Welcome')
})

// Create User
app.post('/api/register',async(req, res, next) => {
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
})

// Login User
app.post('/api/login',async(req, res, next) => {
    try {
        const{password, email} = req.body;
        if(!password || !email){
            res.status(400).send("Fill all the fields")
        }else{
            let user = await Users.findOne({email});
            if(!user){
                return res.status(400).json({error: "Please try to login using correct credentials !!!" });
            }else{
                 // Compare password
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({ error: "Please try to login using correct credentials !!!" });
        }else{
            const payLoad = {
               userId : user._id,
               email : user.email
            }
            const jwtSecretKey = 'Secret Key for JWT'
            jwt.sign(payLoad, jwtSecretKey, {expiresIn: 84600}, async(err,token) => {
                await Users.updateOne(
                    {_id: user._id},
                    {$set: {token}}
                    )
                user.save();
                next()
            } )

            res.json({user})
        }
            }
        }
    }
    catch (err) {
        console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }

})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })