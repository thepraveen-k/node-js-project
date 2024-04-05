const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')


//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler (async (req,res)=>{ 
    
    const contact = await Contact.find({user_id: req.user.id});
    
    res.status(200).json(contact)
})


//@desc Create new contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler (async (req,res)=> {


    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {                   //field is empty, its throw error
        
        res.status(400);
        throw new Error('all field is mandatory !')  
       
    }

    const contact = await Contact.create({             //field is not empty
        name,
        email,
        phone,
       user_id: req.user.id,
    })

    res.status(201).json(contact)

     console.log('The request body is : ' ,req.body)
})


//@desc Get new contact
//@route GET /api/contacts:id
//@access public

const getContact = asyncHandler (async (req,res)=> {

    const contact = await Contact.findById(req.params.id)

    if (!contact){
        res.status(404)
        throw new Error('Contact Not Found')
    }

    res.status(200).json(contact)
})


//@desc Update new contact
//@route PUT /api/contacts:id
//@access public

const updateContact =asyncHandler (async (req,res)=>{

    const contact = await Contact.findById(req.params.id)

    if (!contact){

        res.status(404)
        throw new Error('Contact Not Found')
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )

    res.status(200).json(updateContact)
})


//@desc Delete new contact
//@route DELETE /api/contacts:id


 const deleteContact = asyncHandler (async (req,res)=> {


    const contact = await Contact.findById(req.params.id);
    
    if(!contact) {
        res.status(404)
        throw new Error('Contact Not Found')
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }


    await Contact.deleteOne({_id: req.params.id});

    res.status(200).json(contact)
}) 



module.exports= {getContacts, createContact,getContact, updateContact, deleteContact};