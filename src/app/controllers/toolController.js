const express = require('express');

const Tool = require('../models/tool');

const router = express.Router();

// const authMiddleware = require('../middlewares/auth');
// router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        let tag = req.query.tag;
        if (tag) {
            const tools = await Tool.find({ tags: tag });
            return res.send(tools);
        } else {
            const tools = await Tool.find();
            return res.send(tools);
        }
    } catch (err) {
        return res.status(400).send({ code: 400, error: 'Error loading tools: ' + err });
    }
});

router.get('/:toolId', async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.toolId);
        return res.send(tool);
    } catch (err) {
        return res.status(400).send({ code: 400, error: 'Error loading tool: ' + err });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, link, description, tags } = req.body;

        const tool = await Tool.create({ title, link, description, tags });

        return res.send(tool);
    } catch (err) {
        return res.status(400).send({ code: 400, error: 'Error creating new tool: ' + err });
    }
});

router.delete('/:toolId', async (req, res) => {
    try {
        await Tool.findByIdAndRemove(req.params.toolId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ code: 400, error: 'Error deleting tool: ' + err });
    }
});

module.exports = app => app.use('/tools', router);