const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Post = require('./models/post.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const PostRouter = require('./routes/posts.js');
app.use(cors()); // allow requests from Angular

const port = 3000;
const JWT_KEY = "skfbjshdbfuasdbfajksdbfi`1q234t32794t3279t345798";

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/learn_mongodb').then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});


// Routes
app.get('/', (req, res) => {
    res.send('Server is up and running');
  });

function verifyAccessToken (req, res, next) {
  try {
    // console.log(req.headers, "headers");
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
// Register user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  } 
  else{
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email,  password:hashedPassword }); 
    
      await user.save();
      res.status(201).json({ message: 'User registered'});
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
  
});

// POST - Login (does NOT create a new user)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      // Login success — you can now redirect or create a session/token
      res.json({ message: 'Login successful' , data: {
        access_token: jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '1h' }),
      }});
    } catch (error) {
      res.status(500).json({ error: 'Error during login' });
    }
  });

// app.post('/api/post', verifyAccessToken, async (req, res) => {
//   const { title, content } = req.body;
//   const post = new Post({ title, content });
//   try {
//     await post.save();
//     res.status(201).json({ message: 'Post created successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating post' });
//   }

// })
// app.get('/api/posts', verifyAccessToken, async (req, res) => {
//   try {
//    await Post.find().then((posts) => {
//       res.status(200).json({posts:posts});
//     })
    
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching posts' });
//   }

// });
// app.delete('/api/post/:id', verifyAccessToken, async (req, res) => {
//   const { id } = req.params;
//   Post.findByIdAndDelete(id).then((post) => {
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.status(200).json({ message: 'Post deleted successfully' });
//   }).catch((error) => {
//     res.status(500).json({ error: 'Error deleting post' });
//   });
// })

// app.put('api/post/:id',verifyAccessToken,(req,res)=>{
//   const { id } = req.params;
//   const { title, content } = req.body;
//   Post.findByIdAndUpdate(id, { title, content }, { new: true }).then((post) => {
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
//     res.status(200).json({ message: 'Post updated successfully', post });
//   }).catch((error) => {
//     res.status(500).json({ error: 'Error updating post' });
//   });
// })
app.use('/api/posts', PostRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});