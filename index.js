const getXKomGraphicCards = require('./utils/getXKomGraphicCards');
const getMoreleGraphicCards = require('./utils/getMoreleGraphicCards');
const fs = require('fs');


(async () => {
    const xKomGraphicCards = await getXKomGraphicCards();
    const moreleGraphicCards = await getMoreleGraphicCards();
    const graphicCards = xKomGraphicCards.concat(moreleGraphicCards);
    await fs.promises.writeFile('data.json', JSON.stringify(graphicCards));
})();



//TODO DB;