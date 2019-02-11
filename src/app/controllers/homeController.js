const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    return res.send('Server running on port 3000');
});

module.exports = app => app.use(router);