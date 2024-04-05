const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
    name: {
        type: String,
        reuired: [true, 'Please Add The Contact Name']
    },

    email: {
        type: String,
        reuired: [true, 'Please Add The Contct Email']
    },

    phone: {
        type: String,
        required: [true, 'Please Add The Contact Number']
    },
},
{
    timestamps: true,
}
) 


module.exports = mongoose.model("Contact", contactSchema)