const express = require("express");
const router = express.Router();
const Messages = require('../models/Messages');
const Users = require('../models/Users');
const Conversations = require("../models/Conversation");

// Route 1
router.post(
    '/message', async(req, res) =>{
        try {
            const {conversationId, senderId, message, receiverId = ''} = req.body
            if(!senderId || !message){
                return res.status(400).send("Fill all the felids ")
            }
            if (conversationId) {
                const newMsg = new Messages({ conversationId, senderId, message });
                await newMsg.save();
                res.status(200).send('Message sent successfully');
              } else if(!conversationId && receiverId) {
                const newCon = new Conversations({ members: [senderId, receiverId] });
                await newCon.save();
                const newMsg = new Messages({ conversationId: newCon._id, senderId, message });
                await newMsg.save();
                res.status(200).send('Message sent successfully');
              }else if(!conversationId && !receiverId) {
                return res.status(400).send("Fill all the felids ")
              }
              
        } catch (err) {
            console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
        }
    } 
)


// Route 2
router.get('/message/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        if(conversationId === 'new'){return res.status(200).json([])}
        const messages = await Messages.find({ conversationId });
        const messageUserData = [];
        for (let i = 0; i < messages.length; i++) {
            const user = await Users.findById(messages[i].senderId);
            messageUserData.push({
                user: {
                    email: user.email,
                    fullName: user.fullName,
                },
                message: messages[i].message,
            });
        }
        res.status(200).json(messageUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router