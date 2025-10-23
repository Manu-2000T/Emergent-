# Emergent Test Automation

Automated end-to-end testing suite for the Emergent application using Playwright and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Cases](#test-cases)
- [Page Object Model](#page-object-model)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project contains automated test cases for the Emergent platform (app.emergent.sh), covering:
- User authentication and login flows
- Dashboard functionality
- Task/project creation
- LLM model selection
- GitHub integration features
- Gift functionality

## 🔧 Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- A valid Emergent account with credentials

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
BASE_URL=https://app.emergent.sh
USER_EMAIL=your-email@example.com
USER_PASSWORD=your-password
```

> ⚠️ **Important**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

### Playwright Configuration

The test configuration is defined in `playwright.config.ts`. Key settings include:

- **Test directory**: `./tests`
- **Global setup**: Handles authentication before tests
- **Storage state**: Saves login session for test reuse
- **Reporters**: HTML report generation
- **Browser**: Chromium (can be extended to Firefox/WebKit)

## 📁 Project Structure

```
├── global-setup.ts              # Handles authentication before tests
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Project dependencies
├── pages/                       # Page Object Model classes
│   ├── LoginPage.ts            # Login page interactions
│   ├── DashboardPage.ts        # Dashboard page interactions
│   ├── GiftPage.ts             # Gift functionality
│   └── GitHubIntegrationPage.ts # GitHub integration
├── tests/                       # Test specification files
│   ├── login.spec.ts           # Login test cases
│   ├── task-creation.spec.ts   # Task creation tests
│   ├── llm-selection.spec.ts   # LLM selection tests
│   ├── github-integration.spec.ts # GitHub tests
│   └── gift-functionality.spec.ts # Gift feature tests
├── utils/                       # Utility functions
│   └── env.ts                  # Environment variable handling
├── test-results/               # Test execution results
└── storageState.json           # Saved authentication state
```

## 🚀 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/login.spec.ts
```

### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Tests with Debug Mode
```bash
npx playwright test --debug
```

### View Test Report
```bash
npx playwright show-report
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 🧪 Test Cases

### TC-001: Login Tests
- **TC-001.1**: Login with stored credentials
- **TC-001.2**: Login with fresh credentials

### TC-002: Task Creation
- **TC-002.1**: Create todo app task
- **TC-002.2**: Create e-commerce website task
- **TC-002.3**: Create blog platform task
- **TC-002.4**: Create real-time chat application task
- **TC-002.5**: Create project management tool task

### TC-003: LLM Selection
- **TC-003.1**: Select Claude 4.5 Sonnet
- **TC-003.2**: Select Claude 4.5 Sonnet - 1M (Pro feature)
- **TC-003.3**: Select GPT-5 Beta (Pro feature)
- **TC-003.4**: Select Claude 4.0 Sonnet

### TC-004: GitHub Integration
- **TC-004**: Verify GitHub integration buttons and repository options

### TC-005: Buy Credits
- **TC-005**: Verify Buy Credits button functionality

### TC-006: Gift Functionality
- **TC-006.1**: Click gift icon and verify dropdown menu
- **TC-006.2**: Verify gift menu interaction after login

## 📐 Page Object Model

This project follows the **Page Object Model (POM)** design pattern for better maintainability:

### LoginPage
- Handles all login-related interactions
- Methods: `openEmailLogin()`, `login()`, `verifyToolbarButtons()`

### DashboardPage
- Manages dashboard interactions
- Methods: `waitForDashboardLoad()`, `clickCreateNewTask()`, `enterPrompt()`, `submitPrompt()`, `selectLLM()`

### GitHubIntegrationPage
- GitHub feature interactions
- Methods: `clickGithubIcon()`, `verifyConnectToGithubButton()`, `verifyRepositoryOptions()`

### GiftPage
- Gift functionality
- Methods: `clickGiftIcon()`, `verifyAndClickGiftMenu()`

## 🔄 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      env:
        BASE_URL: ${{ secrets.BASE_URL }}
        USER_EMAIL: ${{ secrets.USER_EMAIL }}
        USER_PASSWORD: ${{ secrets.USER_PASSWORD }}
      run: npx playwright test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## 🔍 Troubleshooting

### Common Issues

**Issue: Tests failing with timeout errors**
- Solution: Increase timeout in `playwright.config.ts` or specific test files
- Check network connectivity and application availability

**Issue: Authentication fails**
- Solution: Verify credentials in `.env` file
- Clear `storageState.json` and re-run tests

**Issue: Element not found errors**
- Solution: Check if selectors in Page Objects need updating
- Application UI may have changed

**Issue: Browser not launching**
- Solution: Run `npx playwright install` to ensure browsers are installed

### Debug Mode

To debug a specific test:
```bash
npx playwright test tests/login.spec.ts --debug
```

### Screenshots and Videos

Failed tests automatically capture screenshots in the `test-results/` directory.
