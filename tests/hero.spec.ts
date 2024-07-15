import { test, expect } from "@playwright/test";

// Test the linkedin button
test("Has LinkedIn button", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");
  const newTabWait = page.waitForEvent("popup");

  const linkedinPage = page.locator(
    "[href='https://www.linkedin.com/in/kevin-yang-23102a222/']"
  );

  await expect(linkedinPage).toBeVisible();
  await expect(linkedinPage).toHaveText("LinkedIn");

  await linkedinPage.click();
  const newTab = await newTabWait;
  await newTab.waitForLoadState();

  // We use a generic starts with so we know its on linkedin
  await expect(newTab).toHaveURL(new RegExp("^https://www.linkedin.com"));
});

// Test the github button
test("Has GitHub button", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  const newTabWait = page.waitForEvent("popup");
  const githubButton = page.locator("[href='https://github.com/kevyang267']");

  await expect(githubButton).toBeVisible();
  await expect(githubButton).toHaveText("Github");

  await githubButton.click();
  const newTab = await newTabWait;
  await newTab.waitForLoadState();
  await expect(newTab).toHaveURL("https://github.com/kevyang267");
});

// Test the gmail link
test("Has gmail link", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  const gmailButton = page.locator("[href = 'mailto:kev4238@gmail.com'] h1");
  await expect(gmailButton).toBeVisible();
  await expect(gmailButton).toHaveText("Gmail");
});
