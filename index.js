// @ts-ignore
var express = require('express');
var bodyParser = require('body-parser');
var usersService = require('./src/services/users-service');
var userActionsService = require('./src/services/users-actions-service.ts');
var app = express();
app.use(bodyParser.json());
app.use('/users', usersService);
app.use('/user-actions', userActionsService);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App is running on port ".concat(PORT));
});
