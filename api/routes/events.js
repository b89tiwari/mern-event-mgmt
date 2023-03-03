const router = require("express").Router();
const User = require("../models/User");
const Event = require("../models/Event")


//CREATE EVENTS
router.post("/", async (req, resp) => {
    const newEvent = new Event(req.body);
    try {
        const saveEvent = await newEvent.save();
        resp.status(200).json(saveEvent);

    } catch (err) {
        resp.status(500).json(err);
    }
})


//UPDATE EVENTS
router.put("/:id", async (req, resp) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event.username === req.body.username) {
            try {

                const updateEvent = await Event.findByIdAndUpdate(
                    req.params.id, {
                    $set: req.body
                },
                    { new: true }
                );
                resp.status(200).json(updateEvent);
            } catch (err) {
                resp.status(500).json(err);
            }

        } else {
            resp.status(401).json("You can delete only your event");
        }

    } catch (err) {
        resp.status(500).json(err);
    }

})

//DELETE EVENTS
router.put("/:id", async (req, resp) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event.username === req.body.username) {
            try {
                await event.delete();
                resp.status(200).json("Event got delted");
            } catch (err) {
                resp.status(500).json(err);
            }

        } else {
            resp.status(401).json("You can delete only your event");
        }

    } catch (err) {
        resp.status(500).json(err);
    }

})

//GET PARTICULAR EVENTS

router.get("/:id", async (req, resp) => {
    try {
        const event = await Event.findById(req.params.id);
        resp.status(200).json(event);

    } catch (err) {
        resp.status(500).json(err);
    }
})

// GET ALL EVENTS LIST

router.get("/", async (req, resp) => {
    const username = req.query.user;
    const category = req.query.cat;
    try {
        let events;
        if (username) {
            events = await Event.find({ username })
        } else if (category) {
            events = await Event.find({
                categories: {
                    $in: [category]
                }
            })
        } else {
            events = await Event.find();
        }
        resp.status(200).json(events);

    } catch (err) {
        resp.status(500).json(err);
    }
})

module.exports = router;