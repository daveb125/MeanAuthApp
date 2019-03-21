const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const listing = require('../models/listing');


router.get('/register', (req, res, next) => {
    res.send('listing REGISTER');
});


// Register
router.post('/register', (req, res, next) => {
  let newlisting = new listing({
    UserID: req.body.UserID,
    Startdate: req.body.Startdate,
    Enddate: req.body.Enddate,
    Description: req.body.Description
  });

  listing.addlisting(newlisting, (err, listing) => {
    if(err){
      res.json({success: false, msg:'Failed to register listing'});
    } else {
      res.json({success: true, msg:'listing registered'});
    }
  });
});

// // Authenticate
// router.post('/authenticate', (req, res, next) => {
//   const listingname = req.body.listingname;
//   const password = req.body.password;

//   listing.getlistingBylistingname(listingname, (err, listing) => {
//     if(err) throw err;
//     if(!listing){
//       return res.json({success: false, msg: 'listing not found'});
//     }

//     listing.comparePassword(password, listing.password, (err, isMatch) => {
//       if(err) throw err;
//       if(isMatch){
//         const token = jwt.sign({data:listing}, config.secret, {
//           expiresIn: 30 // 1 week = 604800 secs
//         });

//         res.json({
//           success: true,
//           token: 'jwt '+token,
//           listing: {
//             id: listing._id,
//             name: listing.name,
//             listingname: listing.listingname,
//             email: listing.email
//           }
//         });
//       } else {
//         return res.json({success: false, msg: 'Wrong password'});
//       }
//     });
//   });
// });

// // Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//     console.log(req);
//   res.json({listing: req.listing});
// });

module.exports = router;
