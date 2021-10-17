import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
    title: String,
    rate: Number,
    latitude: Number,
    longitude: Number,
})

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    points: [PointSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


export default mongoose.model('Post', PostSchema);
