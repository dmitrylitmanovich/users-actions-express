// @ts-ignore
const express = require('express');
const bodyParser = require('body-parser');

const usersService = require('./src/services/users-service');
const userActionsService = require('./src/services/users-actions-service.ts');

const app = express();
app.use(bodyParser.json());

app.use('/users', usersService);

app.use('/user-actions', userActionsService);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
