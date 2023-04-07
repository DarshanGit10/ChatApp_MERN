const express =  require('express');
const app = express();
const cors = require('cors')
app.use(cors())
// DB
const connectToMongo = require('./db')
connectToMongo();

// Import files


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) =>{
    res.send('Welcome')
})

// Routes
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/conversation'))
app.use('/api', require('./routes/message'))



// Listening to port
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })