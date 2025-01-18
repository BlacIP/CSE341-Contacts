const express = require('express');
const router = require('express').Router();

const contacts = require('./contacts');
router.use('/contacts', contacts);

router.get('/', (req, res) => {
    res.send('Hello World!');       
});

module.exports = router;