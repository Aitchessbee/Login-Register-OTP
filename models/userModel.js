const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encrypt = require('mongoose-encryption');

const userSchema = new Schema({
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String, 
        require: true
    }
})

const secret = "virtualtradingwebappsecret.";

userSchema.plugin(encrypt, {secret: secret, encryptedFields:['password']});

const User = mongoose.model('User', userSchema);
module.exports = User;