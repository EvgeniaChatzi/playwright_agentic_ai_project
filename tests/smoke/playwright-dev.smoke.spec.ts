// spec: specs/playwright-dev-home.plan.md
import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import PlaywrightDevHomePage, { type NavLinkName } from "../page-objects/playwright-dev.home.page.js";

test.describe("Playwright.dev home smoke", () => {
    let homePage: PlaywrightDevHomePage;
    let baseURL: string;

    test.beforeEach("Launch the Playwright.dev home page", async ({ page }, testInfo) => {
        // Get the URL from config file
        const envConfig = testInfo.project.use as any;
        baseURL = envConfig.pwDevWeb;

        await log("info", `Launching Playwright.dev in ${envConfig.envName}`);
        homePage = new PlaywrightDevHomePage(page);
        await homePage.goToHomePage(baseURL);
    });

    test("SMOKE_TC001: Should load home page with title, landmarks and h1 @smoke", async ({ page }) => {
        await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

        await expect(homePage.mainNav).toBeVisible();
        await expect(homePage.banner).toBeVisible();
        await expect(homePage.mainContent).toBeVisible();
        await expect(homePage.footer).toBeVisible();

        await expect(homePage.pageHeading).toHaveCount(1);
        await expect(homePage.pageHeading).toHaveText(
            "Playwright enables reliable web automation for testing, scripting, and AI agents."
        );
    });

    test("SMOKE_TC002: Should navigate via primary navbar links @smoke", async ({ page }) => {
        const navLinks: { name: NavLinkName; url: RegExp }[] = [
            { name: "Docs", url: /\/docs\/intro$/ },
            { name: "MCP", url: /\/mcp\/introduction$/ },
            { name: "CLI", url: /\/agent-cli\/introduction$/ },
            { name: "API", url: /\/docs\/api\/class-playwright$/ },
        ];

        for (const { name, url } of navLinks) {
            await homePage.clickNavLink(name);
            await expect(page).toHaveURL(url);
            await expect(homePage.pageHeading.first()).toBeVisible();

            // Back to the home page for the next link
            await homePage.goToHomePage(baseURL);
        }
    });

    test("SMOKE_TC003: Should open docs intro from Get started @smoke", async ({ page }) => {
        await homePage.clickGetStarted();

        await expect(page).toHaveURL(/\/docs\/intro$/);
        await expect(page.getByRole("heading", { level: 1, name: "Installation" })).toBeVisible();
    });

    test("SMOKE_TC004: Should open search with Ctrl+K and close with Escape @smoke", async ({ page }) => {
        await homePage.openSearchWithShortcut();
        await expect(homePage.searchBox).toBeVisible();
        await expect(homePage.searchBox).toBeFocused();
        await expect(homePage.searchCancelBtn).toBeVisible();
        await expect(homePage.poweredByAlgoliaLink).toBeVisible();

        await homePage.closeSearchWithEscape();
        await expect(homePage.searchBox).toBeHidden();
        await expect(page).toHaveURL(`${baseURL}/`);
        await expect(homePage.searchBtn).toBeEnabled();
    });

    test("SMOKE_TC005: Should cycle theme system -> light -> dark @smoke", async () => {
        await homePage.verifyThemeMode("system");

        await homePage.toggleTheme();
        await homePage.verifyThemeMode("light");

        await homePage.toggleTheme();
        await homePage.verifyThemeMode("dark");
    });
});
