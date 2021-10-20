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
    is_visible: {
        type: Boolean,
        default: true
    },
    fwd_messages: {
        type: [{
            from_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            body: String,
            date: Date
        }],
        default: null
    }
}, {
    timestamps: false
})

const DialogSchema = new mongoose.Schema({
    users: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    messages: [MessageSchema],
    type: {
        type: String,
        default: 'dialog',
        required: true
    }
}, {
    timestamps: false
})

export default mongoose.model('Dialog', DialogSchema);
