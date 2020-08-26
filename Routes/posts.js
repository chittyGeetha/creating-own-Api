const router = require("express").Router();
const Post = require("../Model/Post");

router.get("/all-posts", async (req, res) => {
    try {
        let posts = await Post.find({}).sort({ date: "-1" });
        res.status(201).json({ posts })
    } catch (err) {
        console.error(err);
        res.status(500).json("server error")
    }
})

router.post("/add-post", async (req, res) => {
    let { title, details } = req.body;
    try {
        let newPost = new Post({
            title,
            details,
        });
        await newPost.save();
        return res.status(201).json({ msg: "Successfully post created" })
    } catch (err) {
        console.error(err);
        res.status(500).json("Server error")
    }
})


module.exports = router;