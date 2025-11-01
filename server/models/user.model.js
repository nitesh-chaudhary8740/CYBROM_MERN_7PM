const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        enum: [
            'mern fsd', 
            'java fsd', 
            'python fsd', 
            'da/ds', 
            'digital marketing'
        ],
        trim: true
    },
    duration: {
        type: String,
        required: true,
        enum: [
            '5+1 months', 
            '7+1 months', 
            '1 year'
        ],
        trim: true
    },
    contact: {
        type: String,
        required: true,
      
    }
}, { 
    // 👇 Key Change: Automatically adds createdAt and updatedAt fields
    timestamps: true,
    collection: 'users' 
});

// Create and export the model named 'User'
const User = mongoose.model('User', userSchema);

module.exports = {User}