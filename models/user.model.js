/**
 * Define the user schema
 * defines how the user data will be stored in the database
 */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userId: {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        minLength : 10,
        lowercase : true
    },
    userType : {
        type : String,
        required : true,
        default : 'CUSTOMER',
        enum : ['CUSTOMER', 'ADMIN']
    }
}, {timestamps : true} );

/**
 * Define the collection name where it will be stored in the database
 */

module.exports = mongoose.model('User', userSchema);