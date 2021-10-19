import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    // title: String,
    // rate: Number,
    // latitude: Number,
    // longitude: Number,
    body: String,
    from_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    read_state: {
        type: Number,
        default: 0
    },
    fwd_messages: {
        type: [Object],
        default: null
    }
}, {
    timestamps: false
})


export default mongoose.model('Message', MessageSchema);
