const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EmployeeSchema = Schema({
    userId: {   
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    firstname: {
        type: String,
        required: [true, 'Content field is required']
    },
    lastname: {
        type: String,
        required: [true, 'Content field is required']
    },
    email: {
        type: String,
        lowercase: true,
        match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–  9-]*[a-z0–9])?/,
        required: [true, 'Content field is required']
    },
    department: {
        type: String,
        enum: ['administration','engineering','marketing'],
        default: 'marketing',

    },
    title: {
        type: String,
        required: [true, 'Content field is required']
    },
    salary: {
        type: Number,
        required: [true, 'Content field is required']
    },
    status: {
        type: String,
        enum: ['onboarding','active','terminated'],
        default: 'active'
    },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;