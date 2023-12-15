const express = require('express');
const CrudModel = require('../models/crudModel');

const crudRoutes = express.Router();

crudRoutes.get('/getItem', async (req,res)=>{
    try {
        const items = await CrudModel.find();
        if(!items){
        // res.status(400).json({ error: 'Invalid request data' });
         return res.status(400).json({success: false, message: 'item can not be created'})
        }
        return res.status(200).json(items)
    } catch (error) {
         console.error(error);
         return res.status(500).json({success: false, message: 'server error'})
    }
})
// post request
crudRoutes.post('/postItem', async (req,res)=>{
    try {
        const item = await CrudModel.create(req.body);
        if(!item){
        // res.status(400).json({ error: 'Invalid request data' });
         return res.status(400).json({success: false, message: 'item can not be created'})
        }
        return res.status(201).json(item)
    } catch (error) {
         console.error(error);
         return res.status(500).json({success: false, message: 'server error'})
    }
}),
//update Item
crudRoutes.put('/updateItem/:id',async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedData = req.body; // Assuming the request body contains the updated category data

        // Use Mongoose to find the category by ID and update it
        const item = await CrudModel.findByIdAndUpdate(itemId, updatedData, { new: true });

        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        return res.status(200).json({ success: true, message: 'Item successfully updated', updatedItem: item });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
)

//delete request
crudRoutes.delete('/deleteItem/:id', async (req,res)=>{
    try {
        const item = await CrudModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({success: false, message: 'item not found'})
        }
        return res.status(200).json({success: true,message: 'Item is successfully deleted',item})
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'Server error'});        
    }
})

module.exports = crudRoutes
