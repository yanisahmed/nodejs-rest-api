const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model')

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/signup', async (req, res) => {
    const hasedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hasedPassword
    })

    try {
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);

    } catch (error) {
        res.status(500).json(error);
    }

})

router.post('/signin', async (req, res) => {


    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                // Generate Token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login Successfull"
                })

            } else {
                res.status(401).json({
                    "error": "Authentication Failed"
                })
            }
        } else {
            res.status(401).json({
                "error": "Authentication Failed"
            })
        }

    } catch (error) {
        res.status(401).json({
            "error": "Authentication Failed"
        })
    }
})

module.exports = router;