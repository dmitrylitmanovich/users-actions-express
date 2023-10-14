
import express from 'express';
import Provider from '../providers/postgresql-provider';

const router = express.Router();

const provider = new Provider();
const db = provider.connect();

router.post('/', async (req, res) => {
  const { userId, actionType }:
        { userId: string; actionType: string } = req.body;
  const query = 'INSERT INTO actions (user_id, action_type, timestamp) VALUES ($1, $2, NOW())';

  const values = [userId, actionType];

  try {
    await db.query(query, values);
    res.json({ message: 'Action recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error recording action');
  }
});

router.get('/', async (req, res) => {
  try {
    const { userId, page, pageSize }: 
          { userId: string; page: string, pageSize: string } = req.query;

    const limit: number = pageSize ? parseInt(pageSize as string, 10) : 10;
    const offset = page ? (parseInt(page as string, 10) - 1) * limit : 0;
    
    let query = 'SELECT * FROM actions WHERE 1=1';
    const values = Array();

    if (userId) {
      query += ' AND user_id = $1';
      values.push(userId);
    }

    query += ' ORDER BY timestamp DESC LIMIT $2 OFFSET $3';
    values.push(limit, offset);

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user actions');
  }
});

export default router;
