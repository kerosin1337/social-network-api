import mongoose from "mongoose";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

UserSchema.pre('save', function () {
    const salt = crypto.randomBytes(16).toString('hex');
    const password = crypto.pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString('hex');
    this.password = `${salt}:${password}`;
});

UserSchema.methods.validatePassword = function (password) {
    const [salt, hash] = this.password.split(':');
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex') === hash;
}

export default mongoose.model('User', UserSchema);
