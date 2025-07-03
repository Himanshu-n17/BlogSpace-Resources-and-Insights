const express = require("express");
const { body, validationResult } = require("express-validator");
const authenticateToken = require("../middleware/auth");
const Post = require("../models/Post");

const router = express.Router();

// Create a post
router.post(
  "/",
  authenticateToken,
  body("title").notEmpty(),
  body("content").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user.userId,
        url: req.body.url,
        category: req.body.category,
        tags: req.body.tags,
        description: req.body.description,
      });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      console.log(err);

      res
        .status(500)
        .json({ message: "Server error", serverMessage: err.message });
    }
  }
);

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single post
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update post
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Server error" });
  }
});

// Delete post
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
