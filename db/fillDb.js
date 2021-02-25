const getGraphicCards = require('../crawler/getGraphicCards');
const GraphicCard = require('./models/graphicCard.model');

async function fillDb() {
    const graphicCards = await getGraphicCards();
    const storedGraphicCards = await GraphicCard.find({});
    console.log(storedGraphicCards);
    if (storedGraphicCards.length === 0) {
        await GraphicCard.insertMany(graphicCards);
    }
}

module.exports = fillDb;