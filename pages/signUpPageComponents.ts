import { Page } from "playwright";
import commonhelper from "../helper/commonHelper";
import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test';

let firstName: string;
let lastName: string;

export default class LoginPageComponents extends commonhelper {

    constructor(page: Page) {
        super(page);
    }

    locators = {
        button: {
            signUp: "//button[text()='Sign up']"
        },
        textField: {
            emailId: '//input[@name="email"]',
            firstName: "//label[text()='First name']/..//input",
            lastName: "//label[text()='Last name']/..//input",
            password: "//label[text()='Password']/..//input",
            confirmPassword: "//label[text()='Confirm password']/..//input",
        },
        validate: {
            email: "//label[text()='Email ID']/..//p/span",
            firstName: "//label[text()='First name']/..//p/span",
            lastname: "//label[text()='Last name']/..//p/span",
            password: "//label[text()='Password']/..//p/span",
            confirmPassword: "//label[text()='Confirm password']/..//p/span"

        },
        link: {
            signUp: "//a[text()='Sign up']"
        }
    }

    async signUpForm(email: string, passwords: string) {
        await this.waitForVisibility(this.locators.textField.emailId);
        await this.fillField(this.locators.textField.emailId, firstName + lastName + email);
        await this.fillField(this.locators.textField.firstName, firstName);
        await this.fillField(this.locators.textField.lastName, lastName);
        await this.fillField(this.locators.textField.password, firstName + passwords);
        await this.fillField(this.locators.textField.confirmPassword, firstName + passwords);
    }

    async enterInvalidData(email: string, firstname: string, lastname: string, passwords: string) {
        await this.waitForVisibility(this.locators.textField.emailId);
        await this.fillField(this.locators.textField.emailId, email);
        await this.fillField(this.locators.textField.firstName, firstname);
        await this.fillField(this.locators.textField.lastName, lastname);
        await this.fillField(this.locators.textField.password, passwords);
        await this.fillField(this.locators.textField.confirmPassword, passwords + "#123");
    }

    async clickOnSignup() {
        const signUpButton = await this.page.locator(this.locators.button.signUp);
        if (await signUpButton.isVisible()) {
            await this.click(this.locators.button.signUp);
        } else {
            await this.click(this.locators.link.signUp);
            firstName = faker.person.firstName();
            lastName = faker.person.lastName();
        }
    }

    async clearTextfields() {
        await this.waitForVisibility(this.locators.textField.emailId);
        await this.clear(this.locators.textField.emailId);
        await this.clear(this.locators.textField.firstName);
        await this.clear(this.locators.textField.lastName);
        await this.clear(this.locators.textField.password);
        await this.clear(this.locators.textField.confirmPassword);
    }

    async validateMessage() {
        await expect(this.page.locator(this.locators.validate.email)).toHaveText("Please enter your email");
        await expect(this.page.locator(this.locators.validate.firstName)).toHaveText("Please enter your first name");
        await expect(this.page.locator(this.locators.validate.lastname)).toHaveText("Please enter your last name");
        await expect(this.page.locator(this.locators.validate.password)).toHaveText("Please enter your password");
        await expect(this.page.locator(this.locators.validate.confirmPassword)).toHaveText("Please enter your confirm password");
    }

    async invalidMessage() {
        await expect(this.page.locator(this.locators.validate.email)).toHaveText("Please enter a valid email address");
        await expect(this.page.locator(this.locators.validate.firstName)).toHaveText("Please enter valid first name");
        await expect(this.page.locator(this.locators.validate.lastname)).toHaveText("Please enter valid last name");
        await expect(this.page.locator(this.locators.validate.password)).toHaveText("The password should include minimum 8 characters, 1 uppercase, 1 special character, 1 number, 1 lowercase");
        await expect(this.page.locator(this.locators.validate.confirmPassword)).toHaveText("Confirm password should match with password");
    }
}