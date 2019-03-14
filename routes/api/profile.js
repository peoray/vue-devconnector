const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route  GET /api/profile/test
// @desc   Test profile routerdummy data
// @access Public
router.get('/test', (req, res) => {
  res.send('profile works');
});

// @route  GET /api/profile
// @desc   Get current user profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      const { id } = req.user;
      const profile = await Profile.findOne({ user: id }).populate('user', [
        'name',
        'avatar'
      ]);
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.status(200).json(profile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  GET /api/profile/handle/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', async (req, res) => {
  try {
    const errors = {};
    const { handle } = req.params;
    const profile = await Profile.findOne({ handle }).populate('user', [
      'name',
      'avatar'
    ]);
    if (!profile) {
      errors.noprofile = 'There is no profile for this handle';
      return res.status(404).json(errors);
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

// @route  GET /api/profile/all
// @desc   Get all profiles
// @access Public
router.get('/all', async (req, res) => {
  try {
    const errors = {};
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    if (!profiles) {
      errors.noprofiles = 'There are no profiles';
      return res.status(404).json(errors);
    }
    return res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
  }
});

// @route  GET /api/profile/user/:user_id
// @desc   Get profile by user id
// @access Public
router.get('/user/:userId', async (req, res) => {
  try {
    const errors = {};
    const { userId } = req.params;
    const profile = await Profile.findOne({ user: userId }).populate('user', [
      'name',
      'avatar'
    ]);
    if (!profile) {
      errors.noprofile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

// @route  POST /api/profile
// @desc   POST create/edit user profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { isValid, errors } = validateProfileInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { id } = req.user;
      const {
        handle,
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        instagram,
        twitter,
        linkedin,
        facebook
      } = req.body;
      const profileFields = {};
      profileFields.user = id;
      if (handle) profileFields.handle = handle;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      // skills
      if (typeof skills !== 'undefined') {
        profileFields.skills = skills.split(',');
      }
      // social
      profileFields.social = {};
      if (youtube) profileFields.social.youtube = youtube;
      if (twitter) profileFields.social.twitter = twitter;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (facebook) profileFields.social.facebook = facebook;
      if (instagram) profileFields.social.instagram = instagram;

      if (bio) profileFields.bio = bio;
      if (bio) profileFields.bio = bio;
      if (bio) profileFields.bio = bio;
      if (bio) profileFields.bio = bio;
      if (bio) profileFields.bio = bio;
      if (bio) profileFields.bio = bio;

      // check to see if user has id
      const profile = await Profile.findOne({ user: id });
      // if he has, then update
      if (profile) {
        const updateProfile = await Profile.findOneAndUpdate(
          id,
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json(updateProfile);
      }
      console.log('1');
      // check for handl
      const profileHandle = await Profile.findOne({ handle });
      console.log('1');
      // if it exists
      if (profileHandle) {
        errors.handle = 'That handle already exist!';
        return res.status(400).json(errors);
      }
      // create new profile for user
      const newProfile = await new Profile(profileFields).save();
      return res.status(200).json(newProfile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  POST /api/profile/experience
// @desc   POST experience to profile
// @access Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { isValid, errors } = validateExperienceInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { id } = req.user;
      const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      } = req.body;

      const profile = await Profile.findOne({ user: id });
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };
      // add to exp array
      profile.experience.unshift(newExp);
      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  POST /api/profile/education
// @desc   POST education to profile
// @access Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { isValid, errors } = validateEducationInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { id } = req.user;
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;

      const profile = await Profile.findOne({ user: id });
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };
      // add to exp array
      profile.education.unshift(newEdu);
      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  DELETE /api/profile/experienc/:exp_id
// @desc   DELETE experience from profile
// @access Private
router.delete(
  '/experience/:expId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      const { id } = req.user;
      const { expId } = req.params;

      const profile = await Profile.findOne({ user: id });
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      // get remove index
      const removeIndex = profile.education.map(item => item.id).indexOf(expId);
      // splice out of array
      profile.experience.splice(removeIndex, 1);
      // save
      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  DELETE /api/profile/education/:edu_id
// @desc   DELETE education from profile
// @access Private
router.delete(
  '/education/:eduId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      const { id } = req.user;
      const { eduId } = req.params;

      const profile = await Profile.findOne({ user: id });
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      // get remove index
      const removeIndex = profile.education.map(item => item.id).indexOf(eduId);
      // splice out of array
      profile.education.splice(removeIndex, 1);
      // save
      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      console.log(error);
    }
  }
);

// @route  DELETE /api/profile/
// @desc   DELETE user and profile
// @access Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = {};
      const { id } = req.user;

      const profile = await Profile.findOneAndRemove({ user: id });
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
