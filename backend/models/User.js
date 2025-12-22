const mongoose = require('mongoose');
const roles = require('../constants/roles');

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: roles.USER,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    {timestamps: true}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
