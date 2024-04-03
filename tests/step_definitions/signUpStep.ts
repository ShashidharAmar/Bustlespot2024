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


// Then('enter blank values in all textbox and verify the error message', async function () {

// });