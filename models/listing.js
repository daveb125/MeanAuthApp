const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
//const config = require('./models/database');
const config = require('../config/database');


//listing Schema
const listingSchema = mongoose.Schema({
    UserID:{ type : String},
    Startdate : {type : String , required : true},
    Enddate : {type : String , required : true},
    Description : {type : String , required : true},
});

const listing = module.exports = mongoose.model('listing',listingSchema);

//Get by ID
module.exports.getlistingByUserId = function(UserID,callback){
    listing.findById(UserID,callback);
}

//Get by listingname
module.exports.getlistingBylistingname = function(listingname,callback){
    const query = {listingname:listingname}
    listing.findOne(query,callback);
}


//Add listing 1
module.exports.addlisting = function(newlisting,callback){
    newlisting.save(callback);   
}
//Add listing old
// module.exports.addlisting = function(newlisting,callback){
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newlisting.password, salt, (err, hash)=>{
//             //if(err) throw err;
//             console.log(newlisting);
//         newlisting.password = hash; 
//         newlisting.save(callback);            
//         });
//     });
// }
 
// module.exports.comparePassword = function (candidatePassword,hash,callback){
//     bcrypt.compare(candidatePassword,hash,(err,isMatch) => {
//         if (err) throw err;
//         callback(null, isMatch);
//     });
//}