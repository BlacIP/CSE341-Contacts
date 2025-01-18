const express = require('express');
const router = express.Router();
const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

router.get('/', async (req, res, next) => {
    try {
        const db = mongodb.getDb();
        const { email } = req.query;

    
        if (email) {
            const result = await db
                .collection('contatcts')  
                .find({ email: { $regex: email, $options: 'i' } })
                .toArray();

            return res.status(200).json(result);
        }

    
        const result = await db
            .collection('contatcts')  
            .find()
            .toArray();
            
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
      
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const db = mongodb.getDb();
        const result = await db
            .collection('contatcts')  
            .findOne({ _id: new ObjectId(req.params.id) });
            
        if (!result) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const { firstName, lastName, email } = req.body;
        
        
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const db = mongodb.getDb();

        const existingContact = await db
            .collection('contatcts') 
            .findOne({ email: email });

        if (existingContact) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newContact = { firstName, lastName, email };
        const result = await db
            .collection('contatcts')
            .insertOne(newContact);
            
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
