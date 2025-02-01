const express = require('express');
const router = express.Router();

const contacts = require('./contacts');
router.use('/contacts', contacts);
router.use('/api-docs', require('./swagger'));


router.get('/', (req, res) => {
    res.send('Hello World!');       
});


module.exports = router;