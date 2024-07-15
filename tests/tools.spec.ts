import { test, expect } from "@playwright/test";

test("Tools section", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  // Super janky... needs to be fixed
  const expected = [
    "GIT\nLINUX\nVSCode\nIntelliJ\nEclipse\nPostman\nFigma\nGradle\nJira\nMaven"
  ];

  // Grab the second grid
  const toolGrid = page
    .locator("[class='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-1']")
    .locator("nth=1");

  expect(await toolGrid.allInnerTexts()).toEqual(expected);
});
