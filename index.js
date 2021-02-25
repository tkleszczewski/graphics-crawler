const getXKomGraphicCards = require('./utils/getXKomGraphicCards');
const getMoreleGraphicCards = require('./utils/getMoreleGraphicCards');


(async () => {
    const xKomGraphicCards = await getXKomGraphicCards();
    const moreleGraphicCards = await getMoreleGraphicCards();
    const graphicCards = xKomGraphicCards.concat(moreleGraphicCards);
    return graphicCards
})();



//TODO DB;