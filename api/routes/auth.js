const router = require("express").Router();
const User = require("../models/User");
const { randomUUID } = require("crypto");
const bcrypt = require('bcrypt');

//REGISTER
router.post("/register", async (req, resp) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            userId: randomUUID(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        const user = await newUser.save();
        resp.status(200).json(user);

    } catch (err) {
        resp.status(500).json(err);

    }
})

//LOGIN
router.post("/login", async (req, resp) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });

        //return invalid username message if no user exit
        !user && resp.status(400).json({ message: 'Invalid Username provided.' })

        // valiate the password using bcrypt
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && resp.status(400).json({ message: 'Invalid Password provided.' })

        resp.status(200).json(user);

    } catch (error) {

        if (resp.headersSent !== true) {
            resp.status(500).json({ message: 'Something went wrong.' })
        }
    }
});



module.exports = router;