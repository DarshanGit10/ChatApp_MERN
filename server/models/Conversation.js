const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
    members: { type: Array, required: true }
})

const Conversations = mongoose.model('Conversation', conversationSchema)
module.exports = Conversations