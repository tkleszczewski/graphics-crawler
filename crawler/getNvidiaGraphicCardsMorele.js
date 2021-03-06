const urls = [
    'https://www.morele.net/kategoria/karty-graficzne-12/,,,,,,,,0,,,,8143O!2836.!2835/1/',
    'https://www.morele.net/kategoria/karty-graficzne-12/,,,,,,,,0,,,,8143O!2836.!2835/2/',
    'https://www.morele.net/kategoria/karty-graficzne-12/,,,,,,,,0,,,,8143O!2836.!2835/3/'
];
const puppeteer = require('puppeteer');
const { DateTime } = require('luxon');

async function getMoreleDataNvidia(url) {
    let date = DateTime.now();
    date = `${date.day}/${date.month}/${date.year}`;

    const browser = await puppeteer.launch();
    let graphicCards = [];
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    })

    await page.goto(url);
    await page.waitForSelector('.cat-list-products');
    const detailsTextContents = await page.$$eval('.cat-product-feature', elements => elements.filter(element => {
                const { innerText } = element;
                return innerText.includes('Ilość pamięci RAM') || innerText.includes('Rodzaj chipsetu');
            })
            .map(element => element.innerText)
        );
    const prices = await page.$$eval('.price-new', elements => elements.map(element => +element.innerText.split(' ').join('').split('zł')[0].split(',').join('.')));
    const producers = await page.$$eval('.cat-product-name a', elements => elements.map(element => element.innerText.split(' ')[2]));
    
    for (let i = 0; i < detailsTextContents.length / 2; i++) {
        const index = i * 2;
        const graphicCard = {
            memory: detailsTextContents[index].slice(19),
            setup: detailsTextContents[index + 1].slice(17),
            chipset: 'Nvidia',
            price: prices[i],
            producer: producers[i],
            isAvailable: true,
            ecommerce: 'Morele',
            date,
        };
        graphicCards.push(graphicCard);
    }
    browser.close();
    return graphicCards;
}

const getNvidiaGraphicCardsMorele = Promise.all(urls.map(url => getMoreleDataNvidia(url)));

module.exports = getNvidiaGraphicCardsMorele;