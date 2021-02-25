const getGraphicCards = require('../crawler/getGraphicCards');
const GraphicCard = require('./models/graphicCard.model');
const { DateTime } = require('luxon');

async function fillDb() {
    const dt = DateTime.now();
    const graphicCards = await getGraphicCards();
    const storedGraphicCards = await GraphicCard.find({ date: `${dt.day}/${dt.month}/${dt.year}`});
    if (storedGraphicCards.length === 0) {
        return await GraphicCard.insertMany(graphicCards);
    }

    const graphicCardsCheck = new Promise((resolve, reject) => {
        graphicCards.forEach(async (graphicCard, index) => {
            const { setup, producer, ecommerce, date, memory, price, isAvailable } = graphicCard;
            const graphicCardFromDB = await GraphicCard.findOne({ setup, producer, ecommerce, date, memory, price, isAvailable });
            if (!graphicCardFromDB) {
                await GraphicCard.findOneAndUpdate({ setup, producer, ecommerce, date, memory }, { price, isAvailable }, { useFindAndModify: false });
            }
            if(index === (graphicCards.length - 1)) {
                resolve();
            }
        });
    });

    await graphicCardsCheck;
}

module.exports = fillDb;