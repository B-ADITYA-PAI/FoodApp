const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model in models/User.js
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const jwtSecret = "HaHa"

router.post("/createuser",[
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors , errors: errors.array() })
    }
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});





router.post("/loginuser",[
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let email=req.body.email
    try {
        let userData=await User.findOne({email});
        if(!userData)
            {
                return res.status(400).json({errors:"Try logging in with the correct credentials"})
            }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!pwdCompare)
            {
                return res.status(400).json({errors:"Try logging in with the correct credentials"})
            }
        const data = {
        user: {
                id: userData.id
               }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});




module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Assuming you have a User model in models/User.js
// const { body, validationResult } = require('express-validator');

// router.post("/createuser", async (req, res) => {
//     try {
//         await User.create({
//             name: req.body.name,
//             password: req.body.password,
//             email: req.body.email,
//             location: req.body.location
//         });
//         res.json({ success: true });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false });
//     }
// });

// module.exports = router;
