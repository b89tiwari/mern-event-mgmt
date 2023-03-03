const router = require("express").Router();
const User = require("../models/User");
const { randomUUID } = require("crypto");
const bcrypt = require('bcrypt');
const Event = require("../models/Event")


//UPDATE USERS
router.put("/:id", async (req, resp) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        resp.status(200).json(updatedUser);

    } catch (err) {
        resp.status(500).json(err);
    }

})

//DELETE USERS
router.delete("/:id", async (req, resp) => {
    try {
        const user = await User.findById(req.params.id);

        try {
            await Event.deleteMany({ username: user.username });
            await User.findByIdAndDelete(req.params.id);
            resp.status(200).json({ message: 'User has been Deleted.' })

        } catch (err) {
            resp.status(500).json(err);
        }
    } catch (err) {
        resp.status(404).json({ message: 'User not found.' })
    }

})

router.get("/:id", async (req, resp) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._docs;
        resp.status(200).json(user);

    } catch (err) {
        resp.status(500).json(err);
    }
})

module.exports = router;