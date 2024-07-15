import { test, expect } from "@playwright/test";

test("Verify tech section", async ({ page }) => {
  await page.goto("https://website-personal-rosy.vercel.app/");

  // The links are beyond janky; array seems to be seperated by additions
  const expectedLinks = [
    "Next.js\n" +
      "Node.js\n" +
      "TypeScript\n" +
      "Java\n" +
      "C++\n" +
      "MySQL\n" +
      "TailWind\n" +
      "Postgres\n" +
      "HTML\n" +
      "CSS\n" +
      "Python\n" +
      "API\n" +
      "REACT\n" +
      "Express\n" +
      "JUNIT5"
  ];

  // Grab the first grid
  const techGrid = page
    .locator("[class='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-1']")
    .locator("nth=0");

  // Check expected links
  expect(await techGrid.allInnerTexts()).toEqual(expectedLinks);
});
