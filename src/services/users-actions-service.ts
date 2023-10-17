import { Request, Response } from 'express';
import * as express from 'express';
// @ts-ignore
import Action from '../models/Action';

const router = express.Router();

// Create a New Action
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId = '', actionType = '' } = req.body;

    const result = await Action.create({
      user_id: userId,
      actiontype: actionType,
    });

    console.log('Created Action');

    res.status(201).json({
      message: 'Action created successfully!',
      user: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating the action');
  }
});

// GET All Actions
router.get('/', async (req: Request, res: Response) => {
  try {
    const actions = await Action.findAll();

    res.status(200).json({ actions: actions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user actions');
  }
});

// GET an Action for a User
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const page = req.query.page;
    const pageSize = req.query.pageSize;

    const limit = pageSize ? parseInt(pageSize.toString(), 10) : 10;
    const offset = page ? (parseInt(page.toString(), 10) - 1) * limit : 0;

    const whereClause = {
      user_id: userId,
    };

    const actions = await Action.findAll({
      where: whereClause,
      order: [['timestamp', 'DESC']],
      limit: limit,
      offset: offset,
    });

    res.status(200).json({ actions: actions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user actions');
  }
});

module.exports = router;