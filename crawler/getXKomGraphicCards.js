const getAMDGraphicCardsXkom = require("./getAMDGraphicCardsXkom");
const getNvidiaGraphicCardsXkom = require("./getNvidiaGraphicCardsXkom");

async function getXKomGraphicCards() {
    const nvidiaGraphicCardsXkomArray = await getNvidiaGraphicCardsXkom;
    const nvidiaGraphicCardsXkom = nvidiaGraphicCardsXkomArray.flat();

    const amdGraphicCardsXkomArray = await getAMDGraphicCardsXkom;
    const amdGraphicCardsXkom = amdGraphicCardsXkomArray.flat();

    const xkomGraphicCards = nvidiaGraphicCardsXkom.concat(amdGraphicCardsXkom);
    return xkomGraphicCards;
}

module.exports = getXKomGraphicCards;