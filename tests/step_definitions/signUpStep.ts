import { When, Then } from "@cucumber/cucumber";
import { getPage } from "../../helper/hooks";
import signUpPageComponents from "..//..//pages/signUpPageComponents";

let signUpPage: signUpPageComponents;
When('user in lagin page and click on signUp', async function () {
    signUpPage = new signUpPageComponents(getPage());
    await signUpPage.clickOnSignup();
});

When('fill all details with {string} and {string}', async function (email: string, password: string) {
    await signUpPage.signUpForm(email, password);
});

When('click on signUp button', async function () {
    await signUpPage.clickOnSignup();
});

When('navigate to back', async function () {
    await getPage().goBack();
});

When('remove values from all textbox', async function () {
    await signUpPage.clearTextfields();
});

Then('Verify the all textbox validation message', async function () {
    await signUpPage.validateMessage();
});

When("enter invalid {string},{string},{string},{string} and confirmPassword", async function (email: string, firstname: string, lastname: string, passwords: string) {
    await signUpPage.enterInvalidData(email, firstname, lastname, passwords);
});

Then('Verify the invalid error message', async function () {
    await signUpPage.invalidMessage();
});