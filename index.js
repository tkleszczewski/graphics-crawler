const puppeteer = require('puppeteer');

(async () => {
    let graphicCards = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    const xkomQueue = ['https://www.x-kom.pl/g-5/c/346-karty-graficzne-nvidia.html?per_page=90', 'https://www.x-kom.pl/g-5/c/346-karty-graficzne-nvidia.html?per_page=90&page=2'];

    await page.goto('https://www.x-kom.pl/g-5/c/346-karty-graficzne-nvidia.html?per_page=90');
    await page.waitForSelector('#listing-container');
    const $uls = await page.$$('#listing-container ul');

    const prices = await page.$$eval('#listing-container > div > div > div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div > span:nth-of-type(1)', spans => spans.map(span => { return +span.innerText.split(' ').join('').split('zł').join('').split(',')[0] }));
    const isAvailables = await page.$$eval('[title="Dodaj do koszyka"]', buttons => buttons.map(button => !button.disabled));
    const waitUntilDonePromise = new Promise((resolve, reject) => {
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
    await waitUntilDonePromise;
    prices.forEach((price, index) => {
        graphicCards[index].price = price;
    });
    isAvailables.forEach((isAvailable, index) => {
        graphicCards[index].isAvailable = isAvailable;
    });
    console.log(graphicCards);
    browser.close();
})();