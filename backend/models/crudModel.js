const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crudSchema = mongoose.Schema({
     id:Schema.Types.ObjectId,
     title:{
        type: String,
        required: true
     }
})

const CrudModel = mongoose.model('Crud', crudSchema);
module.exports = CrudModel;