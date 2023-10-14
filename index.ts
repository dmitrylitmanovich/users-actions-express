import express from 'express';
import bodyParser from 'body-parser';

import usersService from './services/users-service';
import userActionsService from './services/users-actions-service';

const app = express();
app.use(bodyParser.json());

app.use('/users', usersService);

app.use('/user-actions', userActionsService);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
