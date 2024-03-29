import { Page } from "playwright";
import commonhelper from "../helper/commonHelper";
import { expect } from '@playwright/test';

export default class LoginPageComponents extends commonhelper {

    constructor(page: Page) {
        super(page);
    }

    locators = {
        button: {
            login: "//button[text()='Login']",
            restPassword: "//button[text()='Reset Password']"
        },
        textField: {
            email: "//label[text()='Email ID']/..//input",
            password: "//label[text()='Password']/..//input",
            toastMessage: "//div[contains(@class,'MuiAlert-message')]",
            emailValidation: "//label[text()='Email ID']/..//p/span",
            passwordValidation: "//label[text()='Password']/..//p/span"
        },
        link: {
            forgotPassword: "//a[text()='Forgot password?']"
        }
    }

    async loginToApp(email: string, password: string) {
        await this.fillField(this.locators.textField.email, email);
        await this.fillField(this.locators.textField.password, password);
        await this.click(this.locators.button.login);
    }

    async loginToApplication() {
        await this.fillField(this.locators.textField.email, `${process.env.user_email}`);
        await this.fillField(this.locators.textField.password, `${process.env.user_password}`);
        await this.click(this.locators.button.login);
    }

    async clickForgotPassword(email: string) {
        await this.waitForVisibility(this.locators.link.forgotPassword);
        await this.click(this.locators.link.forgotPassword);
        await this.waitForVisibility(this.locators.textField.email);
        await this.click(this.locators.textField.email);
        await this.page.locator(this.locators.textField.email).pressSequentially(email);
    }

    async textValidation(expectedText: string) {
        await this.waitForVisibility(this.locators.textField.emailValidation);
        await expect(this.page.locator(this.locators.textField.emailValidation)).toHaveText(expectedText);
    }

    async clickOnReset() {
        await this.click(this.locators.button.restPassword);
    }

    async enterEmailAndPassword(email: string, password: string) {
        if (!email && !password) {
            await this.waitForVisibility(this.locators.textField.email);
            await this.page.locator(this.locators.textField.email).clear();
            await this.fillField(this.locators.textField.email, 'passing null value')
            await this.page.locator(this.locators.textField.email).clear();
        } else {
            await this.waitForVisibility(this.locators.textField.email);
            await this.page.locator(this.locators.textField.email).clear();
            await this.fillField(this.locators.textField.email, email);
            await this.click(this.locators.textField.password);
            await this.page.locator(this.locators.textField.password).clear();
            await this.fillField(this.locators.textField.password, password);
            await this.page.locator(this.locators.textField.password).clear();
        }
    }

    async validateTextMessage(expectedText: string) {
        try {
            await this.waitForVisibility(this.locators.textField.emailValidation);
            await expect(this.page.locator(this.locators.textField.emailValidation)).toHaveText(expectedText);

        } catch (exception) {
            await this.waitForVisibility(this.locators.textField.passwordValidation);
            await expect(this.page.locator(this.locators.textField.passwordValidation)).toHaveText(expectedText);
        }
    }

    async verifyToastMessage(text: string) {
        await this.waitForVisibility(this.locators.textField.toastMessage);
        await expect(this.page.locator(this.locators.textField.toastMessage)).toHaveText(text);
    }
}