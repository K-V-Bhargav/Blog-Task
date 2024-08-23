const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Blog = require("./blog");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/test")
    .then(() => console.log("Connected to DataBase !!"))
    .catch(err => console.error("Database connection error:", err));

app.post("/posts/post", async (req, res) => {
    try {
        const data = new Blog(req.body);
        await data.save();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ "status": error.message });
    }
});

app.get('/posts/get', async (req, res) => {
    try {
        const posts = await Blog.find({});
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.get('/posts/get/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the post' });
    }
});

app.put('/posts/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Blog not found !!",
            });
        }
        res.status(200).json({status: 200});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
});

app.delete("/posts/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Blog.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({
                status: 404,
                message: "Blog not found !!",
            });
        }
        res.status(200).json({status: 200});
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
});
  
const port = 8000;
app.set("port", port);
app.listen(port, () => {
    console.log(`Successfully connected to port: ${port}`);
});
