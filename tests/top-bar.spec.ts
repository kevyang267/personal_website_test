import { test, expect } from "@playwright/test";

// Test the resume button
test("Has resume button", async ({ page, headless }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  // Need to wait for a popup event to happen
  const newTabWait = page.waitForEvent("popup");

  // Check if there is a button with the text "Resume"
  const resumeButton = page.locator("[href='/Resume (Kevin Yang).pdf']");

  // Wait for button to be visible first...
  await expect(resumeButton).toBeVisible();

  // The behavior is different for headless and headed
  if (headless === true) {
    // For headless we check if the pdf file is downloaded
    const [pdfDownload] = await Promise.all([
      page.waitForEvent("download"),
      page.click("[href='/Resume (Kevin Yang).pdf']")
    ]);

    // Check that the file has a .pdf extension
    const pdfExtension = pdfDownload.suggestedFilename().endsWith(".pdf");
    expect(pdfExtension).toBe(true);
  } else {
    // If we are headed it is simple; follow the same steps as someone on a browser
    await resumeButton.click();

    // Wait for the new tab to load; waiting here is an issue for some reason on headless
    const newTab = await newTabWait;
    await newTab.waitForLoadState("networkidle");

    // Check that the page url is changed
    await expect(newTab).toHaveURL(
      "https://website-personal-rosy.vercel.app/Resume%20(Kevin%20Yang).pdf"
    );
  }
});

// Check resume button text
test("Resume button has correct text", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  // Check if there is a button with the text "Resume"
  const resumeButton = page.locator("[href='/Resume (Kevin Yang).pdf']");
  await expect(resumeButton).toHaveText("Resume");
});

// Test the logo on the top of the page
test("Has the correct logo", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  const logo = page.locator("[class='text-xl dark:text-white']");
  await expect(logo).toBeVisible();
  await expect(logo).toHaveText("K. Y.");
});
