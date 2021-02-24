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
    await page.goto('https://www.x-kom.pl/g-5/c/346-karty-graficzne-nvidia.html');
    await page.waitForSelector('#listing-container');
    const $listingContainer = await page.$('#listing-container');
    const $uls = await $listingContainer.$$('ul');
    const waitUntilDonePromise = new Promise((resolve, reject) => {
        $uls.forEach(async ($ul, index) => {
            const innerTexts = await $ul.$$eval('li', lis => lis.map(li => li.innerText));
            innerTexts.filter(innerText => innerText.includes('Układ', 'Pamięć'));
            const graphicCard = {
                setup: innerTexts[0].slice(7),
                memory: innerTexts[1].slice(8),
            }
            graphicCards.push(graphicCard);
            console.log(graphicCard);
            if(index === $uls.length - 1) {
                resolve();
            }
        });
    });
    await waitUntilDonePromise;
    browser.close();
})();