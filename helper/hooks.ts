
import { After, AfterAll, AfterStep, Before, BeforeAll, BeforeStep, Status, setDefaultTimeout } from "@cucumber/cucumber";
import dotenv from "dotenv";
import { Page, Browser, BrowserContext, chromium, firefox } from "@playwright/test"

setDefaultTimeout(1000 * 60 * 2);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
    dotenv.config();
    // let browserType = process.env.browser;
    switch (process.env.browser) {
        case 'chromium':
            browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
            break;
        case 'firefox':
            browser = await firefox.launch({ headless: false, args: ['--start-maximized'] });
            break;

        default:
            browser = await chromium.launch({ headless: false, args: ['--start-maximized'] });
            break;
    }
});

Before(async function (scenario) {
    context = await browser.newContext({ viewport: null, javaScriptEnabled: true });
    page = await context.newPage();
    console.log("Scenario Outline: " + scenario.pickle.name);
});

BeforeStep(async function (scenario) {
    console.log(" "+scenario.pickleStep.text);
});

// AfterStep(async function() { 
// });

After(async function ({ pickle, result }) {
    if (result?.status === Status.FAILED) {
        const img = await page.screenshot({ path: `./reports/screenshots/${pickle.name}.png`, type: "png" })
        this.attach(img, "image/png");
    }
    console.log(`>>>>>>>>>>> ${result?.status} >>>>>>>>>>>\n`);
    await page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});

export function getPage(): Page {
    return page;
}