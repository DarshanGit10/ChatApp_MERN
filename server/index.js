const express =  require('express');
const app = express();
const cors = require('cors')
app.use(cors())

const Users = require('./models/Users')

// DB
const connectToMongo = require('./db')
connectToMongo();

// Import files


// Socket io
const io = require('socket.io')(8080, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

let users = []
io.on('connection', socket => {
    // console.log('User connected', socket.id);
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId)
        if(!isUserExist){
            const user = {userId, socketId: socket.id}
            users.push(user)
            io.emit('getUsers', users)
        }
       
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        const user = await Users.findById(senderId);
        // console.log('sender :>> ', sender, receiver);
        if (receiver) {
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                conversationId,
                receiverId,
                user: { id: user._id, fullName: user.fullName, email: user.email }
            });
            }else {
                io.to(sender.socketId).emit('getMessage', {
                    senderId,
                    message,
                    conversationId,
                    receiverId,
                    user: { id: user._id, fullName: user.fullName, email: user.email }
                });
            }
        });

    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
})

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