const getAMDGraphicCardsMorele = require("./getAMDGraphicCardsMorele");
const getNvidiaGraphicCardsMorele = require("./getNvidiaGraphicCardsMorele");

async function getMoreleGraphicCards() {
    const nvidiaGraphicCardsMoreleArray = await getNvidiaGraphicCardsMorele;
    const nvidiaGraphicCardsMorele = nvidiaGraphicCardsMoreleArray.flat();

    const amdGraphicCardsMoreleArray = await getAMDGraphicCardsMorele;
    const amdGraphicCardsMorele = amdGraphicCardsMoreleArray.flat();

    const moreleGraphicCards = nvidiaGraphicCardsMorele.concat(amdGraphicCardsMorele);
    return moreleGraphicCards;
}

module.exports = getMoreleGraphicCards;