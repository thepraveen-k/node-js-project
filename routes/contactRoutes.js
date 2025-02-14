const express = require('express')
const router = express.Router()
const {getContacts, createContact, getContact, updateContact, deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');


//routes are connected in contactController.js 

router.use(validateToken)

router.get('/', getContacts);
router.post('/', createContact);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);   

 /*router.route('/').get(getContacts)
router.route('/').post(createContact)
router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)
router.route('/:id').delete(deleteContact) */






module.exports= router;