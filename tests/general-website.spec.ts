import { test, expect } from "@playwright/test";

// Test the main page URL
test("Has URL", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");
  await expect(page).toHaveURL("https://website-personal-rosy.vercel.app/");
});

// Testing the title of the page
test("Has correct title", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");
  await expect(page).toHaveTitle("Kevin Yang");
});
