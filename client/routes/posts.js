const express = require('express');
const router = express.Router();
const JWT_KEY = "skfbjshdbfuasdbfajksdbfi`1q234t32794t3279t345798";
const jwt = require('jsonwebtoken');
const Post = require('../models/post.js');


function verifyAccessToken (req, res, next) {
  try {
    if (!req.headers['authorization']) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const verifiedData = jwt.verify(req.headers['authorization'].replace('Bearer ', ''), JWT_KEY);
    
    if (!verifiedData._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = verifiedData;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

router.post('', verifyAccessToken, async (req, res) => {
    const { title, content } = req.body;
    if(req.user._id == null){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const post = new Post({ title, content, user_id: req.user._id });
    console.log(post);
    try {
      await post.save();
      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating post' });
    }
  
  })
  router.get('', verifyAccessToken, async (req, res) => {
    try {
     await Post.find({user_id: req.user._id}).then((posts) => {
        res.status(200).json({posts:posts});
      })
      
    } catch (error) {
      res.status(500).json({ error: 'Error fetching posts' });
    }
  
  });
  router.delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    Post.deleteOne({_id: id,user_id: req.user._id}).then((post) => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    }).catch((error) => {
      res.status(500).json({ error: error.message });
      console.log(error);
    });
  })
  
  router.put('/:id',verifyAccessToken,(req,res)=>{
    const { id } = req.params;
    const { title, content } = req.body;
    Post.updateOne({_id:id,user_id: req.user._id}, { title, content }, { new: true }).then((post) => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post updated successfully', post });
    }).catch((error) => {
      res.status(500).json({ error: 'Error updating post' });
    });
  })
  

    module.exports = router;