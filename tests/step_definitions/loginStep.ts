import { Given, When, Then } from "@cucumber/cucumber"
import { getPage } from "../../helper/hooks";
import loginPageComponents from "../../pages/loginPageComponents";

let signInPage: loginPageComponents;
Given('user in login screen', async function () {
  signInPage = new loginPageComponents(getPage());
  await getPage().goto(`${process.env.app_url}`);

});

When('user enter the {string} and {string}', async function (email, password) {
  await signInPage.loginToApp(email, password);
});

When('user enter the email and password', async function () {
  await signInPage.loginToApplication();
});

When('user enter the wrong {string} and {string}', async function (email: string, password: string) {
  await signInPage.enterEmailAndPassword(email, password);
});

Then('Verify popup {string}', async function (expectedText: string) {
  await signInPage.verifyToastMessage(expectedText);
});

Then('Verify the email and password {string}', async function (expectedText: string) {
  await signInPage.validateTextMessage(expectedText);
});