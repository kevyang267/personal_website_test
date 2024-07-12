import { test, expect } from "@playwright/test";

const { chromium } = require("playwright");

// Before all testing we want to make sure we are on the website
// test.beforeAll(async () => {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   await page.goto("https://website-personal-rosy.vercel.app/");
// });

// Test the main page URL
test("Has URL", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");
  await expect(page).toHaveURL("https://website-personal-rosy.vercel.app/");
});

// Test the resume button
test("Has resume button", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  // Need to wait for a popup event to happen
  const newTabWait = page.waitForEvent("popup");

  // Check if there is a button with the text "Resume"
  await page
    .locator(
      "//a[@class='bg-gradient-to-r from-purple-400 to-purple-400 text-white px-4 py-2 rounded-md ml-8 mr-8']"
    )
    .click();

  // Wait for the new tab to load
  const newTab = await newTabWait;
  await newTab.waitForLoadState();

  // Check that the page url is changed
  await expect(newTab).toHaveURL(
    "https://website-personal-rosy.vercel.app/Resume%20(Kevin%20Yang).pdf"
  );
});

// Test the linkedin button
test("Has LinkedIn button", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");
  const newTabWait = page.waitForEvent("popup");

  await page
    .locator("//div[@class='flex gap-2 bg-gray-700 rounded-3xl px-5 py-3']")
    .click();

  const newTab = await newTabWait;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL(
    "https://www.linkedin.com/in/kevin-yang-23102a222/?original_referer=https%3A%2F%2Fwebsite-personal-rosy.vercel.app%2F"
  );
});

// Test the github button
test("Has GitHub button", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");
  const newTabWait = page.waitForEvent("popup");

  await page
    .locator(
      "//button/div[@class='flex justify-normal gap-2 bg-gray-700 rounded-3xl px-5 py-3']"
    )
    .click();

  const newTab = await newTabWait;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL("https://github.com/kevyang267");
});
