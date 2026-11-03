# 1. Instructions and Notes

## 1.1. In this session... 

__Running the E2E Test Sucessfully__
1. Get the API key and update `.env` file
2. Add the following setting in `playwright.config.ts`
```ts
// Use object
userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

// Project object
args: ["--disable-blink-features=AutomationControlled", "--disable-features=IsolateOrigins,site-per-process", "--allow-no-sandbox-job"],
```
1. Re-run the test
2. Test ✅ 

## 1.2. GitHub Actions (CI)

1. Workflow file: `.github/workflows/playwright.yml` (checkout `v6`, as per the Playwright docs)
2. Triggers on `push` and `pull_request` to the `main` branch (or run it manually from the Actions tab)
3. Add these keys in GitHub → Settings → Secrets and variables → Actions:
   - `RUNNER`
   - `TEST_USER_NAME`
   - `TEST_PASSWORD`
4. They are passed to the job in `playwright.yml`:
```yml
env:
  RUNNER: ${{ secrets.RUNNER }}
  TEST_USER_NAME: ${{ secrets.TEST_USER_NAME }}
  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
```
5. The workflow runs `npm run test:make-apt`
6. Push to `main`, then check the run in the GitHub **Actions** tab
7. Download the `playwright-report` (HTML report), `allure-results`, or `test-results` (traces, on failure) artifacts from the run

**💡 Tips:**
- `process.env.CI` is set automatically on GitHub Actions; `playwright.config.ts` uses it for `forbidOnly`, `retries: 2` and `workers: 1`

**Reference:** https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows
---