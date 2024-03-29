import { Page } from "playwright";

export default class commonHelper {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillField(locator: string, data: string) {
        await this.page.locator(locator).fill(data);
    }

    async click(locator: string) {
        await this.page.locator(locator).click();
    }

    async waitForVisibility(locator: string) {
        const ele = this.page.locator(locator);
        await ele.waitFor({ state: "visible" });
    }

    async getText(locator: string) {
        const textvalue = await this.page.textContent(locator)
        return textvalue;
    }
}