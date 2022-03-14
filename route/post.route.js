const router = require('express').Router();
const Post = require('../model/post.model')
const checkLogin = require('../middlewares/checkLogin');


// Get All Post
// Read All Post

router.get('/', checkLogin, async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Create New Post

router.post('/new', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update a Post
router.put('/:id', async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatePost);
    } catch (error) {
        res.status(500).json(error);

    }
})
router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json(deletePost);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router