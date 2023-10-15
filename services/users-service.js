const express = require('express');
export const router = express.Router();

import performDatabaseOperation from '../providers/pg-performer';

router.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id';
  const values = [name, email];

  try {
    const result = await performDatabaseOperation(query, values);
    res.json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
  const values = [name, email, id];

  try {
    await performDatabaseOperation(query, values);
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating user');
  }
});

router.get('/users', async (req, res) => {
  const query = 'SELECT * FROM users';
  try {
    const result = await performDatabaseOperation(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

