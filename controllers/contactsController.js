const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

const getContacts = async (req, res, next) => {
    try {
        const db = mongodb.getDb();
        const { email } = req.query;

        if (email) {
            const result = await db
                .collection('contacts')
                .find({ email: { $regex: email, $options: 'i' } })
                .toArray();

            return res.status(200).json(result);
        }

        const result = await db
            .collection('contacts')
            .find()
            .toArray();

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const db = mongodb.getDb();
        const result = await db
            .collection('contacts')
            .findOne({ _id: new ObjectId(req.params.id) });

        if (!result) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const addContact = async (req, res, next) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const db = mongodb.getDb();

        const existingContact = await db
            .collection('contacts')
            .findOne({ email: email });

        if (existingContact) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newContact = { firstName, lastName, email, favoriteColor, birthday };
        const result = await db
            .collection('contacts')
            .insertOne(newContact);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        const db = mongodb.getDb();
        const result = await db
            .collection('contacts')
            .updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { firstName, lastName, email, favoriteColor, birthday } }
            );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const db = mongodb.getDb();
        const result = await db
            .collection('contacts')
            .deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact
};