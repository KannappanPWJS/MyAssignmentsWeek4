
/* File Upload Assignment

Navigate to https://login.salesforce.com/

- Enter username - Enter password - Click Login - Click App Launcher icon - Click View All 
- Enter Accounts in App Launcher search box - Click Accounts - Click New - Enter Account Name 
- Select Prospect from the Type dropdown - Select Banking from the Industry dropdown
- Click Save - Assert the Account created - Upload files - Click Done and assert the uploaded file */

import test, { expect, Locator } from '@playwright/test'
import path from 'path';
import { Expect } from '@playwright/test';

test ("File Upload Assignment", async({page})=>{

    await page.goto("https://login.salesforce.com/");
    await page.locator("#username").fill("dilipkumar.rajendran@testleaf.com");
    await page.locator("#password").fill("TestLeaf@2025");
    await page.locator("#Login").click();
    await page.locator("//div[@class='slds-icon-waffle']").click();
    await page.locator("//button[text()='View All']").click();
    await page.locator("//input[@placeholder='Search apps or items...']").fill("Accounts")
    await page.locator("//mark[text()='Accounts']").click();
    await page.locator("//div[text()='New']").click();
    await page.locator("//input[@name='Name']").fill("TestSK")
    await page.locator("(//div[@class='slds-combobox_container'])[3]").click();
    await page.click("[data-value='Prospect']")
    await page.locator("(//div[@class='slds-combobox_container'])[4]").click();
    await page.click("[data-value='Banking']")
    await page.locator("//button[text()='Save']").click();
    await expect(page.locator("//div[@class='slds-hyphenate']")).toContainText(/was created/);
    const upload = page.waitForEvent('filechooser',{timeout: 5000});
    await page.locator("//span[text()='Upload Files']").click();
    const catchEvent = await upload;
    await catchEvent.setFiles(path.join(__dirname, '../../FileUpload/Blackpng.png'));
    await page.waitForTimeout(5000);
    await page.locator("//span[text()='Done']").click();
    await expect(page.locator("//div[@class='slds-hyphenate']")).toContainText(/was added/);
    await expect(page.locator("(//span[text()='Blackpng'])[2]")).toHaveText(/Blackpng/);   
})

