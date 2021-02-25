const { mongoose } = require('../db');
const { Schema } = mongoose;

const graphicCardSchema = new Schema({
    setup: String,
    memory: String,
    chipset: String,
    price: Number,
    producer: String,
    isAvailable: Boolean,
    ecommerce: String,
    date: String,
});

module.exports = mongoose.model('GraphicCard', graphicCardSchema);