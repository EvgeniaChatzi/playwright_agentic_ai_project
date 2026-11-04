import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";

export type NavLinkName = "Docs" | "MCP" | "CLI" | "API";
export type ThemeMode = "system" | "light" | "dark";

export default class PlaywrightDevHomePage extends BasePage {
    // Constructor
    constructor(page: Page) {
        super(page);
    }

    /** Elements */
    get htmlRoot() {
        return this.page.locator("html");
    }
    get mainNav() {
        return this.page.getByRole("navigation", { name: "Main" });
    }
    get banner() {
        return this.page.getByRole("banner");
    }
    get mainContent() {
        return this.page.getByRole("main");
    }
    get footer() {
        return this.page.getByRole("contentinfo");
    }
    get pageHeading() {
        return this.page.getByRole("heading", { level: 1 });
    }
    get getStartedLink() {
        return this.page.getByRole("link", { name: "Get started" });
    }
    get themeToggleBtn() {
        return this.page.getByRole("button", { name: /Switch between dark and light mode/ });
    }
    get searchBtn() {
        // Name is "Search (Control+k)" or "Search (Meta+k)" depending on platform
        return this.page.getByRole("button", { name: /^Search/ });
    }
    get searchBox() {
        return this.page.getByRole("searchbox", { name: "Search" });
    }
    get searchCancelBtn() {
        return this.page.getByRole("button", { name: "Cancel" });
    }
    get poweredByAlgoliaLink() {
        return this.page.getByRole("link", { name: "Powered by Algolia" });
    }
    navLink(name: NavLinkName) {
        return this.mainNav.getByRole("link", { name, exact: true });
    }

    /** Page Actions */
    async goToHomePage(url: string) {
        await this.navigateTo(url);
        await this.waitForPageReady();
    }

    /** The theme toggle stays disabled until the page's JS has loaded (hydration).
     *  Keyboard shortcuts like Ctrl+K aren't registered before that. */
    async waitForPageReady() {
        await expect(this.themeToggleBtn).toBeEnabled();
    }

    async clickNavLink(name: NavLinkName) {
        await log("info", `Clicking the "${name}" navbar link...`);
        await this.click(this.navLink(name));
    }

    async clickGetStarted() {
        await log("info", `Clicking the "Get started" link...`);
        await this.click(this.getStartedLink);
    }

    async openSearchWithShortcut() {
        await log("info", `Opening the search dialog with Ctrl/Cmd+K...`);
        await this.page.keyboard.press("ControlOrMeta+k");
    }

    async closeSearchWithEscape() {
        await log("info", `Closing the search dialog with Escape...`);
        await this.page.keyboard.press("Escape");
    }

    async toggleTheme() {
        await this.click(this.themeToggleBtn);
    }

    /** Assertions */
    async verifyThemeMode(mode: ThemeMode) {
        await expect(this.themeToggleBtn).toHaveAccessibleName(new RegExp(`currently ${mode} mode`));
        if (mode !== "system") {
            await expect(this.htmlRoot).toHaveAttribute("data-theme", mode);
        }
        await log("info", `The theme is in ${mode} mode`);
    }
}
