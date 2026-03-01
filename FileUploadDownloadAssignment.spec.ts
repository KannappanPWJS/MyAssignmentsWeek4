// File Upload & Download Assignment

/* Preconditions:
- Use page fixture
- Load the URL (https://the-internet.herokuapp.com/upload)
- Load the URL (https://the-internet.herokuapp.com/download)
Assignment Requirements:
File Upload
- Upload a document without clicking the Upload button on the page
- Upload an image inside the red square area
- Assert that the file has been uploaded
File Download
- Download file.json from the list of files
- Assert that the file has been downloaded in the required path
Hints to Solve:
- Use setInputFiles(), fileChooser and waitForEvent() for the respective actions */

import test, { expect } from '@playwright/test';
import path from 'path';
import fs from 'fs'
import { Expect } from '@playwright/test';

test ("File Upload Assignment", async({page})=>{

    await page.goto(`https://the-internet.herokuapp.com/upload`)
    
    const chooser = page.waitForEvent('filechooser',{timeout: 5000})                                // Establish the Event
    
    page.locator(`//div[@id='drag-drop-upload']`).click()                                           // Trigger the Event 
     
    const catchEvent = await chooser                                                                // Catch the Event Resolve Promise
    
    await catchEvent.setFiles(path.join(__dirname, '../../FileUpload/Blackpng.png'))                // Upload file
    
    await page.waitForTimeout(5000)
   
    await expect(page.locator(`(//div[@class='dz-filename']/span)[1]`)).toHaveText(/Blackpng.*/);   // Assert file


})


test("File Download Assignment",async({page})=>{
    
    await page.goto(`https://the-internet.herokuapp.com/download`)
    
    const downloadEvent = page.waitForEvent('download',{timeout:10000})

     page.getByRole('link',{name:'file.json'}).click()

     const temp = await downloadEvent

     await temp.saveAs(path.join(__dirname,"../../FileUpload/",temp.suggestedFilename()))

     expect(fs.existsSync(path.join(__dirname,"../../FileUpload/",temp.suggestedFilename()))).toBeTruthy()


})