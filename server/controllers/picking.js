import PickingSchema from "../models/picking.js";
import mongoose from "mongoose";

export const getOnePick = async(req, res) => {
    const { id: _id } = req.params;

    try {
        const data = await PickingSchema.findById(_id);
        res.status(201).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPicked = async(req, res) => {

    try {
        const data = await PickingSchema.find();
        
        res.status(200).send(data);
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const createPicked = async(req, res) => {
    const { weight } = req.body;

    try {
        const newData = new PickingSchema({ weight });
        await newData.save();
    
        res.status(200).json({ message: `data saved`});
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const updatePick = async( req, res ) => {
    const { id: _id } = req.params;
    const { weight } = req.body;

    console.log(_id, weight);
    try {
         if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(200).json(`The id is invalid`);
         
                
    } catch (error) {
        console.log(error);
    }
}