import { When, Then } from "@cucumber/cucumber";
import loginPageComponents from "../../pages/loginPageComponents";
import {getPage} from "../../helper/hooks";

let forgotPasswordPage:loginPageComponents;

When('user click on the forgot password and enter {string}', async function (email: string) {
    forgotPasswordPage =new loginPageComponents(getPage());
    await forgotPasswordPage.clickForgotPassword(email);
});

Then('Verify the email textfield {string}', async function (textValidation: string) {
    await forgotPasswordPage.textValidation(textValidation);
});

When('click on reset password', async function () {
    await forgotPasswordPage.clickOnReset();
});