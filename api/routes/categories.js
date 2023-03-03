const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, resp) => {
    const newCategory = new Category(req.body);
    try {

        const saveCat = await newCategory.save();
        resp.status(200).json(saveCat);
    } catch (err) {
        resp.status(500).json(err)
    }
})

router.get("/", async (req, resp) => {
    try {

        const categories = await Category.find();
        resp.status(200).json(categories);
    } catch (err) {
        resp.status(500).json(err)
    }
})


module.exports = router;