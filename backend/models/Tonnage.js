const mongoose = require('mongoose');

const TonnageSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    bench_press: Number,
    squat: Number,
    deadlift: Number,
    snatch: Number,
    clean_and_jerk: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Tonnage = mongoose.model('Tonnage', TonnageSchema);

module.exports = Tonnage;
