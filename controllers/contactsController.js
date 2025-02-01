const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');
const { NotFoundError, AppError } = require('../helpers/errorClasses');
const { handleMongoErrors } = require('../middleware/errorHandler');

const getContacts = async (req, res, next) => {
    try {
        const contacts = await mongodb.getDb().collection('contacts').find().toArray();
        res.status(200).json({
            status: 'success',
            results: contacts.length,
            data: {
                contacts
            }
        });
    } catch (error) {
        next(handleMongoErrors(error));
    }
};

const getContactById = async (req, res, next) => {
    try {
        const contact = await mongodb.getDb().collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
        if (!contact) {
            throw new NotFoundError('Contact not found');
        }
        res.status(200).json({
            status: 'success',
            data: {
                contact
            }
        });
    } catch (error) {
        next(handleMongoErrors(error));
    }
};

const addContact = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().collection('contacts').insertOne(req.body);
        const contact = result.ops[0];
        res.status(201).json({
            status: 'success',
            data: {
                contact
            }
        });
    } catch (error) {
        next(handleMongoErrors(error));
    }
};

const updateContact = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().collection('contacts').findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body },
            { returnOriginal: false, upsert: false }
        );
        const contact = result.value;
        if (!contact) {
            throw new NotFoundError('Contact not found');
        }
        res.status(200).json({
            status: 'success',
            data: {
                contact
            }
        });
    } catch (error) {
        next(handleMongoErrors(error));
    }
};

const deleteContact = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            throw new NotFoundError('Contact not found');
        }
        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(handleMongoErrors(error));
    }
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    updateContact,
    deleteContact
};
