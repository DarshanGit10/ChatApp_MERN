const express = require("express");
const router = express.Router();
const Conversations = require("../models/Conversation");
const Users = require("../models/Users");

// Router 1
router.post("/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversations({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    res.status(200).send("Conversation saved successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Router 2
router.get("/conversation/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({
      members: { $in: [userId] },
    });
    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.members.find(
          (member) => member !== userId
        );
        const receiver = await Users.findById(receiverId);
        return {
          receiver: { email: receiver.email, fullName: receiver.fullName },
          conversationId: conversation._id,
        };
      })
    );
    res.status(200).json(conversationUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
