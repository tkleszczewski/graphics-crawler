const getXKomGraphicCards = require('./getXKomGraphicCards');
const getMoreleGraphicCards = require('./getMoreleGraphicCards');

async function getGraphicCards() {
    const xKomGraphicCards = await getXKomGraphicCards();
    const moreleGraphicCards = await getMoreleGraphicCards();
    const graphicCards = xKomGraphicCards.concat(moreleGraphicCards);
    return graphicCards
}

module.exports = getGraphicCards;