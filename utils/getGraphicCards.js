const getXKomGraphicCards = require('./utils/getXKomGraphicCards');
const getMoreleGraphicCards = require('./utils/getMoreleGraphicCards');

async function getGraphicCards() {
    const xKomGraphicCards = await getXKomGraphicCards();
    const moreleGraphicCards = await getMoreleGraphicCards();
    const graphicCards = {
        xkom: xKomGraphicCards,
        morele: moreleGraphicCards,
    };
    return graphicCards
}

module.exports = getGraphicCards;