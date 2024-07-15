import { test, expect } from "@playwright/test";

// Test the resume button
test("Has resume button", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  // Need to wait for a popup event to happen
  const newTabWait = page.waitForEvent("popup");

  // Check if there is a button with the text "Resume"
  await page.locator("[href='/Resume (Kevin Yang).pdf']").click();

  // Wait for the new tab to load
  const newTab = await newTabWait;
  await newTab.waitForLoadState();

  // Check that the page url is changed
  await expect(newTab).toHaveURL(
    "https://website-personal-rosy.vercel.app/Resume%20(Kevin%20Yang).pdf"
  );
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
