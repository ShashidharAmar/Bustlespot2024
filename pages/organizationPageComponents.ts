import { Page } from "playwright";
import commonhelper from "../helper/commonHelper";


export default class organizationPageComponents extends commonhelper {

    constructor(page: Page) {
        super(page);
    }

    locators = {
        button: {
            createOrgButton: "//p[text()='+ Create New Organization']",
            createNewOrg: "//button[text()='Create a new Organization']",
            submit: '//button[@type="submit"]',
            Yes: "//button[@name='submitText']",
            switchOrgButton: '//header//button[@type="button"]',
            selectSecondOrg: '(//div[@role="presentation"]//div/div/p)[2]'
        },
        textField: {
            orgName: '//input[@name="name"]',
            orgDescription: '//textarea[@name="description"]',
            orgNameValidaton: '//label[text()="Organization Name *"]/..//p//span',
            descriptionValidaton: '//label[text()="Organization Description *"]/..//p//span',
            submitButton: '//button[@type="submit"]',
            uploadLogo: "//div[text()='Upload Logo']",
        },
        link: {
            forgotPassword: "//a[text()='Forgot password?']"
        }
    }

    async createNewOrg(orgName:string, description:string, path:string) {
        try {
            await this.waitForVisibility(this.locators.button.createOrgButton);
            await this.click(this.locators.button.createOrgButton);
        } catch (error) {
            await this.click(this.locators.button.createNewOrg);
        }
        await this.fillField(this.locators.textField.orgName, orgName);
        await this.fillField(this.locators.textField.orgDescription, description);
        await this.page.locator('//input[@type="file"]').setInputFiles(path);
        await this.click(this.locators.button.submit);
    }

    async deleteOrganization(orgName: string) {
        console.log("sbfsdfk")
        await this.waitForVisibility("//p[text()='" + orgName + "']/../../..//div//p[text()='Delete']");
        await this.click("//p[text()='" + orgName + "']/../../..//div//p[text()='Delete']");
        await this.click(this.locators.button.Yes);
    }
}