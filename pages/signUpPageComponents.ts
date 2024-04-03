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

    // async successMessage(String message) {
    // 	wt.waitForVisibility(messagePopup);
    // 	String actualText = messagePopup.getText();
    // 	if (actualText.contains(message)) {
    // 		Assert.assertEquals(actualText, message);
    // 		System.out.println(actualText);
    // 	} else {
    // 		System.out.println(actualText);
    // 	}
    // }

    async enterBlankValues() {
        await this.waitForVisibility(this.locators.textField.emailId);
        await this.clear(this.locators.textField.emailId);
        await this.clear(this.locators.textField.firstName);
        await this.clear(this.locators.textField.lastName);
        await this.clear(this.locators.textField.password);
        await this.clear(this.locators.textField.confirmPassword);

        await expect(this.page.locator(this.locators.validate.email)).toHaveText("Please enter your email");
        await expect(this.page.locator(this.locators.validate.firstName)).toHaveText("Please enter your first name");
        await expect(this.page.locator(this.locators.validate.lastname)).toHaveText("Please enter your last name");
        await expect(this.page.locator(this.locators.validate.password)).toHaveText("Please enter your password");
        await expect(this.page.locator(this.locators.validate.confirmPassword)).toHaveText("Please enter your confirm password");
    }

    // async enterInvalidValues() throws AWTException, InterruptedException {
    // 	Robot robot = new Robot();
    // 	firstName.click();
    // 	Thread.sleep(2000);
    // 	robot.keyPress(KeyEvent.VK_D);
    // 	lastName.click();
    // 	Thread.sleep(2000);
    // 	robot.keyPress(KeyEvent.VK_D);
    // 	String emailActualText = emailTextbox.getText().stripTrailing();
    // 	Assert.assertEquals(emailActualText, "Please enter a valid email address");
    // 	wt.waitForVisibility(firstNameTextbox);
    // 	String firstnameActualText = firstNameTextbox.getText().stripTrailing();
    // 	Assert.assertEquals(firstnameActualText, "Please enter valid first name");
    // 	wt.waitForVisibility(lastNameTextbox);
    // 	String lastnameActualText = lastNameTextbox.getText().stripTrailing();
    // 	Assert.assertEquals(lastnameActualText, "Please enter valid last name");
    // 	String passwordActualText = passwordTextbox.getText().stripTrailing();
    // 	Assert.assertEquals(passwordActualText,
    // 			"The password should include minimum 8 characters, 1 uppercase, 1 special character, 1 number, 1 lowercase");
    // 	String confirmPasswordActualText = confirmPasswordTextbox.getText().stripTrailing();
    // 	Assert.assertEquals(confirmPasswordActualText, "Confirm password should match with password");
    // }
}