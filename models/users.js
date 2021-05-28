const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = Schema({
    email: {
        type: String,
        lowercase: true,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/,
        required: [true, 'Content field is required']
    },
    password: {
        type: String,
        required: [true, 'Content field is required']
    },
    date: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;