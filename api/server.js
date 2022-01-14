const express = require('express');
const logger = require('./middleware/middleware');
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');


// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const server = express();

server.use(express.json(), logger);
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    console.log('get request to root');
    res.status(200).json( { message: 'The gettings good!'})
});

server.use('*', (err, req, res, next) => {
    console.log('There is an error');
    res.status(500).json( { error: err});
});
module.exports = server;
