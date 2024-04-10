import { When } from '@cucumber/cucumber';
import organizationScreen from '../../pages/organizationPageComponents'
import { getPage } from '../../helper/hooks';

let orgScreen: organizationScreen;

When('create new organization {string},{string} and {string}', async function (orgName: string, description: string, path: string) {
  orgScreen = new organizationScreen(getPage());
  await orgScreen.createNewOrg(orgName, description, path);
});

When('delete organization {string}', async function (orgName: string) {
  orgScreen = new organizationScreen(getPage());
  await orgScreen.deleteOrganization(orgName);

});