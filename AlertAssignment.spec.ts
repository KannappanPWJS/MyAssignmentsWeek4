/* Assignment Details:
Automate interactions with frames, trigger alerts, and verify the displayed text based on actions using Playwright on the given application.
Preconditions:
- Use page fixture
- Load the URL (https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm)
Assignment Requirements:
- Click Try it.
- Get the message, type and accept the alert.
- Retrieve the text “You pressed OK!” and verify it. */

import test, { expect } from '@playwright/test'
test ("Alert Assignment", async({page})=>{

    page.on('dialog',alertType=>{
        const msg = alertType.message();
        console.log("Message is " + msg);

        const type = alertType.type();
        console.log("Alert Type is " + type);

        alertType.accept()

    })
    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");
    const frame = page.frameLocator("#iframeResult");
    await frame.locator("//button[text()='Try it']").click();
    const outputText = await frame.locator("#demo").innerText();
    console.log("Inner Text is " + outputText);
    expect(outputText).toEqual("You pressed OK!");
    await page.waitForTimeout(5000);
})