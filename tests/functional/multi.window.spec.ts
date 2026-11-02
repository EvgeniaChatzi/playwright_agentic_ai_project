import { test, expect } from "@playwright/test";

test.describe("Multiple windows handling", () => {
    test("Should switch between parent and child windows", async ({ page, context }) => {
        // 1. Launch URL
        await page.goto("https://the-internet.herokuapp.com/");
        await expect(page).toHaveTitle("The Internet");

        // 2. Click on the Multiple Windows link and assert the title
        await page.getByRole("link", { name: "Multiple Windows" }).click();
        await expect(page).toHaveURL(/\/windows$/);
        await expect(page).toHaveTitle("The Internet");
        await expect(page.locator("h3")).toHaveText("Opening a new window");

        // 3. Click the link that opens the next window and switch to it
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            page.getByRole("link", { name: "Click Here" }).click(),
        ]);
        await newWindow.waitForLoadState();

        // 4. Assert the title and header text in the new window
        await expect(newWindow).toHaveURL(/\/windows\/new$/);
        await expect(newWindow).toHaveTitle("New Window");
        await expect(newWindow.locator("h3")).toHaveText("New Window");

        // 5. Come back to the parent window
        await page.bringToFront();
        await expect(page.locator("h3")).toHaveText("Opening a new window");
        expect(context.pages()).toHaveLength(2);
    });
});
