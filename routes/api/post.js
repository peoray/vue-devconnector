const router = require('express').Router();
const passport = require('passport');
// const jwt = ('jsonwebtoken');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// const User = require('../../models/User');
const validatePostInput = require('../../validation/post');

// @route  GET /api/posts/test
// @desc   Test post route
// @access Public

router.get('/test', (req, res) => {
  res.send('post works');
});

// @route  GET /api/posts/
// @desc   Get all posts
// @access Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});

// @route  GET /api/posts/id
// @desc   Get a post
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found!' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});

// @route  POST /api/posts/
// @desc   Create post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { isValid, errors } = validatePostInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { id } = req.user;
      const { text } = req.body;
      // const post = await Post.findOne({ user: id });
      const newPost = new Post({
        text,
        user: id
      });
      await newPost.save();
      return res.status(200).json(newPost);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  DELETE /api/posts/
// @desc   Delete post
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      // Profile.findOne({ user: req.user }).then(profile => {
      //   Post.findById(id).then(post => {
      //     if (post.user.toString() !== req.user.id) {
      //       return res
      //         .status(401)
      //         .json({ notauthorized: 'User not authorized' });
      //     }
      //   });
      // });

      // const profile = await Profile.findOne({ user: req.user.id });
      // if (!profile) {
      //   return res.status(400).json({ profile: 'You cannot do that' });
      // }
      const post = await Post.findById(id);
      // console.log(post);
      if (!post) {
        return res.status(404).json({ post: 'No post found!' });
      }
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized' });
      }
      await post.remove();
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  POST /api/posts/like/id
// @desc   Like poste
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      // const profile = await Profile.findOne({ user: req.user.id });
      // if (!profile) {
      //   return res.status(400).json({ profile: 'You cannot do that' });
      // }
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ post: 'No post found!' });
      }
      if (post.likes.filter(like => like.user.toString() === id).length > 0) {
        return res
          .status(400)
          .json({ alreadyliked: 'User already liked this post' });
      }
      post.likes.unshift({ user: id });
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  POST /api/posts/unlike/id
// @desc   Unlike post
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      // const profile = await Profile.findOne({ user: req.user.id });
      // if (!profile) {
      //   return res.status(400).json({ profile: 'You cannot do that' });
      // }
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ post: 'No post found!' });
      }
      if (post.likes.filter(like => like.user.toString() === id).length === 0) {
        return res.status(400).json({
          notliked: 'you have not like this post yet'
        });
      }
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      // post.likes.unshift({ user: id });
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  POST /api/posts/comment/id
// @desc   Create comment
// @access Private
router.post(
  '/:id/comment/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { isValid, errors } = validatePostInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ nopost: 'No post found found!' });
      }
      const newComment = {
        text: req.body.text,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  DELETE /api/posts/comment/id
// @desc   Create comment
// @access Priv
router.delete(
  '/:id/comment/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      // console.log(post);
      if (!post) {
        return res.status(404).json({ post: 'No post found!' });
      }
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.commentId
        ).length === 0
      ) {
        return res.status(404).json({
          nocomment: 'Comment does not exist'
        });
      }
      const removeIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.commentId);

      post.comments.splice(removeIndex, 1);

      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
