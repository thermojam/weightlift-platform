const mongoose = require('mongoose');

const FeedbackFormSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        discipline: {
            type: String,
            required: true,
            enum: ['weightlifting', 'powerlifting'],
        },
        height: {
            type: Number,
            required: true,
            min: 100,
            max: 250,
        },
        weight: {
            type: Number,
            required: true,
            min: 30,
            max: 300,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female'],
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const FeedbackForm = mongoose.model('FeedbackForm', FeedbackFormSchema);

module.exports = FeedbackForm;
