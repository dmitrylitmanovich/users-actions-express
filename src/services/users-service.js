const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET All Users
router.get('/', async (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(err => console.log(err));
});

// CREATE a New User
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  User.create({
    name: name,
    email: email
  })
    .then(result => {
      console.log('Created User');

      res.status(201).json({
        message: 'User created successfully!',
        user: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// GET a User by ID
router.get('/:id', async (req, res) => {
  const {id: userId} = req.params;

  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json({ user: user });
    })
    .catch(err => console.log(err));
});

// UPDATE a User
router.put('/:id', async (req, res) => {
  const { id: userId, name: updatedName, email: updatedEmail } = req.params;

  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      user.name = updatedName;
      user.email = updatedEmail;

      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated!', user: result });
    })
    .catch(err => console.log(err));
});

// DELETE a User
router.delete('/:id', async (req, res) => {
  const { id: userId } = req.params;

  User.findByPk(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      return User.destroy({
        where: {
          id: userId
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'User deleted!' });
    })
    .catch(err => console.log(err));
});

module.exports = router;
