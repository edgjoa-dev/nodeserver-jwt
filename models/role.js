const { Schema, model } = require("mongoose");



const RoleSchema =  Schema({

    role:{
        type: String,
        required: [true, 'El rol es necesario']
    }
});

module.exports = model("Role", RoleSchema);