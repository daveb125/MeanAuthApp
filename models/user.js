const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
//const config = require('./models/database');
const config = require('../config/database');


//User Schema
const UserSchema = mongoose.Schema({
    name:{ type : String},
    email : {type : String , required : true},
    username : {type : String , required : true},
    password : {type : String , required : true},
});

const User = module.exports = mongoose.model('User',UserSchema);

//Get by ID
module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

//Get by Username
module.exports.getUserByUsername = function(username,callback){
    const query = {username:username}
    User.findOne(query,callback);
}

//Add User
module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            //if(err) throw err;
            console.log(newUser);
        newUser.password = hash; 
        newUser.save(callback);            
        });
    });
}
 
module.exports.comparePassword = function (candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}