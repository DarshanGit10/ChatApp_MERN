const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    conversationId: { type: String },
    senderId: { type: String },
    message: { type: String }
})

const Messages = mongoose.model('message', messageSchema)
module.exports = Messages