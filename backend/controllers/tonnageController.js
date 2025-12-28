const Tonnage = require('../models/Tonnage');
const mongoose = require('mongoose');

exports.addTonnage = async (req, res) => {
    try {
        const newTonnage = new Tonnage({...req.body, user: req.user.id});
        await newTonnage.save();
        res.status(201).send(newTonnage);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

exports.getTonnage = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        const tonnage = await Tonnage.aggregate([
            { $match: { user: userId } },
            {
                $lookup:
                    {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userObject'
                    }
            },
            { $unwind: "$userObject" }
        ]);
        res.status(200).send(tonnage);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
