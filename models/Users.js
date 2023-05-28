const mongoose = require('mongoose');
const bcrpty = require('bcrypt');

const usersSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

usersSchema.pre('Save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrpty.hash(user.password, 8);
    }
})

module.exports = mongoose.model('Users', usersSchema)