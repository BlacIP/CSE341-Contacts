const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const { validate, contactValidationRules, validateId } = require('../middleware/validation');
const asyncHandler = require('../helpers/asyncHandler');

router.get('/', asyncHandler(contactsController.getContacts));
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Retrieve all contacts'
    /* #swagger.responses[200] = {
        description: 'A list of contacts'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */

router.get('/:id', 
    validateId,
    validate,
    asyncHandler(contactsController.getContactById)
);
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Retrieve a contact by ID'
    // #swagger.parameters['id'] = { 
    //     in: 'path',
    //     description: 'The contact ID',
    //     required: true,
    //     type: 'string'
    // }
    /* #swagger.responses[200] = {
        description: 'A single contact'
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid ID format'
    } */
    /* #swagger.responses[404] = {
        description: 'Contact not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */

router.post('/',
    contactValidationRules,
    validate,
    asyncHandler(contactsController.addContact)
);
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Add a new contact'
    /* #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string' },
                        favoriteColor: { type: 'string' },
                        birthday: { type: 'string' }
                    }
                }
            }
        }
    } */
    /* #swagger.responses[201] = {
        description: 'Contact created'
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */

router.put('/:id',
    validateId,
    contactValidationRules,
    validate,
    asyncHandler(contactsController.updateContact)
);
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Update a contact by ID'
    // #swagger.parameters['id'] = { 
    //     in: 'path',
    //     description: 'The contact ID',
    //     required: true,
    //     type: 'string'
    // }
    /* #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
                    properties: {
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        email: { type: 'string' },
                        favoriteColor: { type: 'string' },
                        birthday: { type: 'string' }
                    }
                }
            }
        }
    } */
    /* #swagger.responses[200] = {
        description: 'Contact updated'
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input'
    } */
    /* #swagger.responses[404] = {
        description: 'Contact not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */

router.delete('/:id',
    validateId,
    validate,
    asyncHandler(contactsController.deleteContact)
);
    // #swagger.tags = ['Contacts']
    // #swagger.summary = 'Delete a contact by ID'
    // #swagger.parameters['id'] = { 
    //     in: 'path',
    //     description: 'The contact ID',
    //     required: true,
    //     type: 'string'
    // }
    /* #swagger.responses[200] = {
        description: 'Contact deleted'
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid ID format'
    } */
    /* #swagger.responses[404] = {
        description: 'Contact not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */

module.exports = router;
