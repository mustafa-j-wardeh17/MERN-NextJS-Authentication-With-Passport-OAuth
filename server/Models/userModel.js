import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    githubId: {
        type: String,
    },
    role: {
        type: String,
        enum: ['github', 'google', 'email'],
    },
    photoUrl: {
        type: String,
    },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
