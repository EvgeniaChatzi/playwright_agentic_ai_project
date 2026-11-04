# Playwright.dev Home Page Test Plan

> Verified on the live page https://playwright.dev/ on 2026-11-04 with the `playwright-test-planner` agent. Expected results that weren't observed during exploration are marked **(unverified)**.

## Application Overview

The home page at https://playwright.dev/ is a Docusaurus landing page. Page title: "Fast and reliable end-to-end testing for modern web apps | Playwright".

Observed structure:

- **Skip link:** "Skip to main content", with href `#__docusaurus_skipToContent_fallback`.
- **Navbar** (`navigation "Main"`), left to right:
  - Logo link "Playwright logo Playwright" (`/`).
  - Links: Docs (`/docs/intro`), MCP (`/mcp/introduction`), CLI (`/agent-cli/introduction`), API (`/docs/api/class-playwright`).
  - Language dropdown button "Node.js". Its options are Node.js (`/`), Python (`/python/`), Java (`/java/`) and .NET (`/dotnet/`).
  - Right side:
    - Link "GitHub repository" (`https://github.com/microsoft/playwright`).
    - Link "Discord server" (`https://aka.ms/playwright/discord`).
    - Theme toggle button. Its name is "Switch between dark and light mode (currently system mode)". The name changes to "currently light mode", then "currently dark mode", then back to "system mode".
    - Search button, named "Search (Control+k)" or "Search (Meta+k)" depending on platform, with a visible "Ctrl K" hint on desktop.
  - There is no "Community" link in the navbar. Community pages are reachable only via the footer.
- **Hero** (`banner`):
  - `h1`: "Playwright enables reliable web automation for testing, scripting, and AI agents."
  - Paragraph with inline links TypeScript (`/docs/intro`), Python, .NET and Java (`/{python|dotnet|java}/docs/intro`).
  - "Get started" link (`/docs/intro`).
  - "Star" link (`https://github.com/microsoft/playwright`) and a stargazers link (`https://github.com/microsoft/playwright/stargazers`). The count, currently "99k+", is volatile.
- **Main sections:**
  - Three product cards (h3):
    - "Playwright Test", with code `npm init playwright@latest`.
    - "Playwright CLI", with code `npm i -g @playwright/cli@latest`.
    - "Playwright MCP", with code `npx @playwright/mcp@latest`.
  - h2 "Built for testing": Auto-wait and web-first assertions, Test isolation, Resilient locators, Parallelism and sharding.
  - h2 "Built for AI agents": Accessibility snapshots, not screenshots; MCP server; CLI for coding agents; Session monitoring.
  - h2 "Powerful tooling": Test generator, Trace Viewer, VS Code extension.
  - A "Chromium, Firefox, WebKit" image with the text "Any browser. Any platform. …".
  - h2 "Chosen by companies and open source projects", with 9 logo links.
- **Footer** (`contentinfo`): link groups Learn, Community and More, plus a copyright line "Copyright © 2026 Microsoft".
- **Search dialog** (Algolia DocSearch): a "Search" modal with a searchbox, a "Cancel" button, a "Powered by Algolia" link, and footer hints Navigate, Select and ESC Close.
- **Mobile (375x667):** the navbar shows a "Toggle navigation bar" hamburger, the logo and Search. The drawer holds the nav links, the theme toggle and the language dropdown.

**Assumptions for all scenarios:**
- Fresh browser context with no stored preferences.
- Desktop viewport 1280x720 unless stated otherwise.
- No network mocking unless stated otherwise.
- Navigation checks only verify the URL and that the destination loads.
- The star count is never asserted exactly.

**Seed file for all scenarios:** `tests/seed.spec.ts`

---

## 1. Page Load and Structure

### 1.1 Home page loads with correct title and landmarks
**Steps:**
1. Navigate to `https://playwright.dev/`.
2. Check the title.
3. Check that `navigation "Main"`, `banner`, `main` and `contentinfo` are visible.
4. Check the `h1`.

**Expected results:**
- The title is "Fast and reliable end-to-end testing for modern web apps | Playwright".
- All four landmarks are visible.
- Exactly one `h1`, with the text "Playwright enables reliable web automation for testing, scripting, and AI agents."

### 1.2 Section headings present in order
**Steps:**
1. Navigate to the home page.
2. Collect the h2 headings.

**Expected results:**
- In order: "Built for testing", "Built for AI agents", "Powerful tooling", "Chosen by companies and open source projects".
- The h3 headings "Playwright Test", "Playwright CLI" and "Playwright MCP" appear above the first h2.

---

## 2. Navbar

### 2.1 Navbar items are present
**Steps:**
1. Navigate to the home page.
2. Inspect the "Main" navigation.

**Expected results:**
- Visible: the logo, "Docs", "MCP", "CLI", "API", the "Node.js" button, "GitHub repository", "Discord server", the theme toggle and Search.
- There is no "Community" link in the navbar.

### 2.2 Logo returns to home
**Steps:**
1. Navigate to `/docs/intro`.
2. Click the "Playwright logo Playwright" link.

**Expected results:**
- The URL is `https://playwright.dev/`.
- The hero `h1` is visible.

### 2.3 Primary navbar links navigate correctly (parameterized)
**Steps:** For each link below, click it from the home page and check the URL.

| Link | Expected URL path |
|------|-------------------|
| Docs | `/docs/intro` |
| MCP | `/mcp/introduction` |
| CLI | `/agent-cli/introduction` |
| API | `/docs/api/class-playwright` |

**Expected results:**
- The URL matches.
- The destination page loads with a visible `h1`.

### 2.4 Language dropdown lists all languages
**Steps:**
1. Click the "Node.js" button.

**Expected results:**
- The links Node.js, Python, Java and .NET appear.
- Their hrefs are `/`, `/python/`, `/java/` and `/dotnet/`.

### 2.5 Language dropdown navigation (parameterized)
**Steps:** For each of Python, Java and .NET:
1. Open the dropdown.
2. Click the language.

**Expected results:**
- The URL path starts with `/python/`, `/java/` or `/dotnet/` respectively.
- The navbar button label changes to the chosen language **(unverified)**.

### 2.6 Language dropdown closes with Escape or an outside click
**Steps:**
1. Open the dropdown.
2. Press Escape.
3. Reopen it and click an empty area of the page.

**Expected results:**
- The list of languages is hidden each time **(unverified)**.
- The URL is unchanged.

### 2.7 GitHub and Discord icon links
**Steps:**
1. Read the `href` of "GitHub repository" and "Discord server".

**Expected results:**
- GitHub `href` is `https://github.com/microsoft/playwright`.
- Discord `href` is `https://aka.ms/playwright/discord`.
- Each link has an accessible name.

---

## 3. Theme Toggle

### 3.1 Theme cycles system → light → dark → system
**Steps:**
1. Note the toggle name: "…(currently system mode)".
2. Click it three times, checking the name and `<html data-theme>` after each click.

**Expected results:**
- The name cycles through "currently light mode", then "currently dark mode", then "currently system mode".
- The page colours switch between light and dark.
- The `data-theme` values are **(unverified)**.

### 3.2 Theme persists after reload and navigation
**Steps:**
1. Click the toggle twice to reach dark mode.
2. Reload the page.
3. Click "Docs", then click the logo to return home.

**Expected results:**
- The toggle still reports "currently dark mode" at each step.
- The dark styling is kept.

### 3.3 System preference is honoured
**Steps:**
1. Create a new context with `colorScheme: 'dark'` and load the home page.
2. Repeat with `colorScheme: 'light'`.

**Expected results:**
- The toggle name says "currently system mode" in both cases.
- The rendered theme follows the emulated scheme.

---

## 4. Search

### 4.1 Open the search dialog by click
**Steps:**
1. Click the Search button.

**Expected results:**
- A modal opens with a focused `searchbox "Search"`.
- The modal shows a "Cancel" button, a "Powered by Algolia" link, and the Navigate, Select and ESC Close hints.

### 4.2 Open the search dialog with the keyboard shortcut
**Steps:**
1. Press Control+K (Meta+K on macOS).

**Expected results:**
- The same modal opens with the searchbox focused.

### 4.3 Close the search dialog
**Steps:**
1. Open search and press Escape.
2. Reopen it and click "Cancel".

**Expected results:**
- The modal closes both ways.
- The URL stays `https://playwright.dev/`.
- The Search button is usable again.

### 4.4 Basic query
**Steps:**
1. Open search.
2. Type `locator`.
3. Wait for results.

**Expected results:**
- Result items appear **(unverified)**.
- Exact result text is not asserted.

### 4.5 Select a result with the keyboard
**Steps:**
1. Search for `locator`.
2. Press ArrowDown, then Enter.

**Expected results:**
- The modal closes and the URL changes to a docs page **(unverified)**.

### 4.6 Query with no results
**Steps:**
1. Search for `zzzxqwv123nonexistent`.

**Expected results:**
- A no-results message appears, with no crash or console error **(unverified)**.

### 4.7 Special characters
**Steps:**
1. Type `<script>alert(1)</script>` into the searchbox.
2. Clear the input.

**Expected results:**
- No dialog appears.
- The input clears.

---

## 5. Hero Section

### 5.1 Hero content
**Steps:**
1. Navigate to the home page.

**Expected results:**
- The `h1` is visible.
- The paragraph contains "One API to drive Chromium, Firefox, and WebKit" and the links TypeScript, Python, .NET and Java.
- "Get started" is visible.

### 5.2 Hero language links (parameterized)
**Steps:** Click each link below from the home page and check the URL.

| Link | Expected URL path |
|------|-------------------|
| TypeScript | `/docs/intro` |
| Python | `/python/docs/intro` |
| .NET | `/dotnet/docs/intro` |
| Java | `/java/docs/intro` |

**Expected results:**
- Each URL matches and the page loads.

### 5.3 "Get started" navigation
**Steps:**
1. Click "Get started".

**Expected results:**
- The URL is `https://playwright.dev/docs/intro`.

### 5.4 GitHub star links
**Steps:**
1. Locate the Star link and the stargazers link.
2. Check their `href` values.

**Expected results:**
- Star `href` is `https://github.com/microsoft/playwright`.
- Stargazers `href` is `https://github.com/microsoft/playwright/stargazers`.
- The count text is non-empty and matches `/^\d+(\.\d+)?k?\+?$/`. The exact number is not asserted.

---

## 6. Feature Sections

### 6.1 Product cards
**Steps:**
1. Scroll to the three cards.

**Expected results:**
- Each card shows its title, description and install command:
  - "Playwright Test": `npm init playwright@latest`.
  - "Playwright CLI": `npm i -g @playwright/cli@latest`.
  - "Playwright MCP": `npx @playwright/mcp@latest`.

### 6.2 Product card links (parameterized)
**Steps:** Click each link below from the home page and check the URL.

| Link | Expected URL path |
|------|-------------------|
| Testing documentation | `/docs/intro` |
| CLI documentation | `/docs/getting-started-cli` |
| MCP documentation | `/docs/getting-started-mcp` |

**Expected results:**
- Each destination loads.
- Some links may redirect, so assert that the path starts with the expected one.

### 6.3 "Built for testing" and "Built for AI agents" content
**Steps:**
1. Scroll to each section.

**Expected results:**
- "Built for testing" shows: Auto-wait and web-first assertions, Test isolation, Resilient locators, Parallelism and sharding.
- "Built for AI agents" shows: Accessibility snapshots, not screenshots; MCP server; CLI for coding agents; Session monitoring.
- The "Model Context Protocol" link has href `https://modelcontextprotocol.io`.

### 6.4 "Powerful tooling" links (parameterized)
**Steps:** Click each link below from the home page and check the URL.

| Link | Expected URL path |
|------|-------------------|
| Test generator | `/docs/codegen` |
| Trace Viewer | `/docs/trace-viewer-intro` |
| VS Code extension | `/docs/getting-started-vscode` |

**Expected results:**
- Each URL matches and the page loads.

### 6.5 "Any browser. Any platform." block
**Steps:**
1. Scroll to the block.

**Expected results:**
- The image with alt "Chromium, Firefox, WebKit" has loaded (`naturalWidth > 0`).
- The text mentions Linux, macOS and Windows.
- The Python, .NET and Java links point to `/python/docs/intro`, `/dotnet/docs/intro` and `/java/docs/intro`.

---

## 7. "Chosen by companies and open source projects"

### 7.1 Logos displayed
**Steps:**
1. Scroll to the heading.

**Expected results:**
- The h2 is visible.
- 9 logo links are shown, each with an image whose alt matches the name: VS Code, Bing, Outlook, Disney+ Hotstar, Material UI, ING, Adobe, React Navigation, Accessibility Insights.
- Every image has `naturalWidth > 0`.

### 7.2 Logo link targets
**Steps:**
1. Read each logo link's `href`. Don't click them all.

**Expected results:**

| Logo | Expected href |
|------|---------------|
| VS Code | `https://code.visualstudio.com` |
| Bing | `https://bing.com` |
| Outlook | `https://outlook.com` |
| Disney+ Hotstar | `https://www.hotstar.com/` |
| Material UI | `https://github.com/mui-org/material-ui` |
| ING | `https://github.com/ing-bank/lion` |
| Adobe | `https://github.com/adobe/spectrum-web-components` |
| React Navigation | `https://github.com/react-navigation/react-navigation` |
| Accessibility Insights | `https://accessibilityinsights.io/` |

---

## 8. Footer

### 8.1 Footer groups and links
**Steps:**
1. Scroll to the footer.

**Expected results:**
- **Learn:** Getting started, Playwright Training, Learn Videos, Feature Videos.
- **Community:** Stack Overflow, Discord, X, LinkedIn.
- **More:** GitHub, YouTube, Blog, Ambassadors, Microsoft Privacy Statement.
- The copyright text matches `/Copyright © \d{4} Microsoft/`.

### 8.2 Internal footer links (parameterized)
**Steps:** Click each link below from the home page and check the URL.

| Link | Expected URL path |
|------|-------------------|
| Getting started | `/docs/intro` |
| Learn Videos | `/community/learn-videos` |
| Feature Videos | `/community/feature-videos` |
| Ambassadors | `/community/ambassadors` |

**Expected results:**
- Each URL matches and the page loads.

### 8.3 External footer link hrefs
**Steps:**
1. Read the `href` of each external link.

**Expected results:**

| Link | Expected href |
|------|---------------|
| Playwright Training | `https://learn.microsoft.com/en-us/training/modules/build-with-playwright/` |
| Stack Overflow | `https://stackoverflow.com/questions/tagged/playwright` |
| Discord | `https://aka.ms/playwright/discord` |
| X | `https://x.com/playwrightweb` |
| LinkedIn | `https://www.linkedin.com/company/playwrightweb` |
| GitHub | `https://github.com/microsoft/playwright` |
| YouTube | `https://www.youtube.com/channel/UC46Zj8pDH5tDosqm1gd7WTg` |
| Blog | `https://dev.to/playwright` |
| Microsoft Privacy Statement | `https://go.microsoft.com/fwlink/?LinkId=521839` |

---

## 9. Keyboard Accessibility

### 9.1 Skip link
**Steps:**
1. Load the page.
2. Press Tab once.
3. Press Enter.

**Expected results:**
- "Skip to main content" receives focus.
- Activating it moves focus into the main content, and the URL gets `#__docusaurus_skipToContent_fallback`.

### 9.2 Navbar tab order
**Steps:**
1. Press Tab repeatedly from the top of the page.

**Expected results:**
- Order: skip link, logo, Docs, MCP, CLI, API, Node.js button, GitHub, Discord, theme toggle, Search, then the hero links.
- A focus indicator is visible on each item.
- There are no keyboard traps.

### 9.3 Language dropdown by keyboard
**Steps:**
1. Focus the "Node.js" button and press Enter.
2. Tab to "Python" and press Enter.

**Expected results:**
- Navigation goes to `/python/`.
- Whether the dropdown opens on keyboard Enter is **(unverified)**.

### 9.4 Theme toggle by keyboard
**Steps:**
1. Focus the toggle.
2. Press Enter, then Space.

**Expected results:**
- Each press advances the mode (system → light → dark).

### 9.5 Search focus handling
**Steps:**
1. Open search with Control+K.
2. Type a few characters.
3. Press Escape.

**Expected results:**
- The searchbox is focused immediately.
- After Escape, the dialog is closed and focus returns to the Search button.

### 9.6 "Get started" by keyboard
**Steps:**
1. Tab to "Get started".
2. Press Enter.

**Expected results:**
- The URL is `/docs/intro`.

---

## 10. Responsive and Mobile (375x667)

### 10.1 Navbar collapses
**Steps:**
1. Set the viewport to 375x667 and load the home page.

**Expected results:**
- Visible: "Toggle navigation bar", the logo and the Search button.
- Docs, MCP, CLI, API and the icon links are not shown inline.
- No horizontal scrolling.

### 10.2 Mobile drawer content
**Steps:**
1. Click "Toggle navigation bar".

**Expected results:**
- The button reports `expanded`.
- The drawer shows: the logo, the theme toggle, "Close navigation bar", Docs, MCP, CLI, API, GitHub repository, Discord server, a "Node.js" button with "Expand the dropdown", and "← Back to main menu".

### 10.3 Close the drawer
**Steps:**
1. Open the drawer.
2. Click "Close navigation bar".

**Expected results:**
- The drawer closes.
- Closing with Escape is **(unverified)**.

### 10.4 Mobile drawer navigation
**Steps:**
1. Open the drawer.
2. Click "Docs".

**Expected results:**
- The URL is `/docs/intro`.
- The drawer is hidden after navigation **(unverified)**.

### 10.5 Language selection in the drawer
**Steps:**
1. Open the drawer.
2. Click "Expand the dropdown".
3. Choose "Python".

**Expected results:**
- The URL starts with `/python/` **(unverified)**.

### 10.6 Theme toggle in the drawer
**Steps:**
1. Open the drawer.
2. Click the theme toggle.

**Expected results:**
- Its name changes to "currently light mode" **(unverified)**.

### 10.7 Search on mobile
**Steps:**
1. Click Search.
2. Type `test`.
3. Press Escape.

**Expected results:**
- The modal fits the viewport.
- The searchbox accepts input.
- The dialog closes.

### 10.8 Content reflow
**Steps:**
1. Scroll through the full page.

**Expected results:**
- The `h1` and "Get started" are fully visible.
- Cards and sections stack.
- The logos list wraps.
- `document.documentElement.scrollWidth <= window.innerWidth`.

### 10.9 Tablet and large desktop
**Steps:**
1. Load the page at 768x1024, then at 1920x1080.

**Expected results:**
- No overlap and no horizontal scroll.
- The navbar is inline or a hamburger, consistently for each width.

---

## 11. Negative and Edge Cases

### 11.1 Unknown path
**Steps:**
1. Navigate to `https://playwright.dev/this-page-does-not-exist`.

**Expected results:**
- A not-found page is shown with the navbar and footer **(unverified)**.
- Clicking the logo returns to `/`.

### 11.2 Back and forward keep the theme
**Steps:**
1. Switch the theme to dark.
2. Click "Docs".
3. Go back, then forward.

**Expected results:**
- Both pages render correctly.
- Dark mode persists.

### 11.3 Blocked third-party calls
**Steps:**
1. Block requests to `api.github.com` and `*.algolia.net`.
2. Load the home page.

**Expected results:**
- The hero, sections and footer still render.
- The page doesn't crash.
