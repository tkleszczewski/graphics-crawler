const urls = ['https://www.x-kom.pl/g-5/c/22-karty-graficzne-amd.html?per_page=90'];
const puppeteer = require('puppeteer');
const { DateTime } = require('luxon');

async function getXKomDataAMD(url) {
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
    await page.waitForSelector('#listing-container');
    const $uls = await page.$$('#listing-container ul');
    const getDetailsPromise = new Promise((resolve, reject) => {
        $uls.forEach(async ($ul, index) => {
            const innerTexts = await $ul.$$eval('li', lis => lis.map(li => li.innerText));
            innerTexts.filter(innerText => innerText.includes('Układ', 'Pamięć'));
            const graphicCard = {
                setup: innerTexts[0].slice(7),
                memory: innerTexts[1].slice(8),
            }
            graphicCards.push(graphicCard);
            if(index === $uls.length - 1) {
                resolve();
            }
        });
    });
    await getDetailsPromise;

    const prices = await page.$$eval('#listing-container > div > div > div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div > span:nth-of-type(1)', spans => spans.map(span => { return +span.innerText.split(' ').join('').split('zł').join('').split(',')[0] }));
    const isAvailables = await page.$$eval('[title="Dodaj do koszyka"]', buttons => buttons.map(button => !button.disabled));
    const producers = await page.$$eval('#listing-container > div > div > div:nth-of-type(2) >div:nth-of-type(2) h3 span', spans => spans.map(span => span.innerText.split(' ')[0]));
    prices.forEach((price, index) => {
        graphicCards[index].price = price;
    });
    isAvailables.forEach((isAvailable, index) => {
        graphicCards[index].isAvailable = isAvailable;
    });
    producers.forEach((producer, index) => {
        graphicCards[index].producer = producer;
    });
    graphicCards.forEach(graphicCard => { graphicCard.chipset = 'AMD'; graphicCard.ecommerce = 'xkom', graphicCard.date = date });
    browser.close();
    return graphicCards;
}

const getAMDGraphicCardsXkom =  Promise.all(urls.map(url => getXKomDataAMD(url)));

module.exports = getAMDGraphicCardsXkom;