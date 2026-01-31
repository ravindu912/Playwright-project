# 🧪 Swift Translator Test Suite

Automated testing suite for [SwiftTranslator.com](https://www.swifttranslator.com/) - Singlish to Sinhala translation validation.

## 📊 Test Coverage

| Test Type | Count | Description |
|-----------|-------|-------------|
| ✅ Positive Functional | 24 | Valid inputs that should translate correctly |
| ❌ Negative Functional | 10 | Edge cases and error scenarios |
| 🎨 UI Tests | 1 | Real-time translation functionality |
| **Total** | **35** | Complete test coverage |

---

## 🚀 Quick Start

### 1️⃣ Install Node.js
Download and install from: https://nodejs.org/ (LTS version)

### 2️⃣ Set Up Project
```bash
# Create project folder
mkdir swift-translator-tests
cd swift-translator-tests

# Initialize project
npm init -y

# Install Playwright
npm install -D @playwright/test
npx playwright install
```

### 3️⃣ Add Files
Create this folder structure:
```
swift-translator-tests/
├── tests/
│   └── complete-swift-translator-tests.spec.js
├── package.json
└── playwright.config.js
```

### 4️⃣ Run Tests
```bash
# Run all tests with visible browser
npm run test:headed

# Or use the full command
npx playwright test --headed
```

---

## 📝 Test Categories

### Positive Functional Tests (24)

Tests that validate correct translation behavior:

1. **Basic Sentences**
   - Simple present tense
   - Compound sentences
   - Complex sentences with conditions

2. **Question Forms**
   - Interrogative questions
   - Polite requests

3. **Commands**
   - Imperative commands
   - Direct instructions

4. **Tenses**
   - Past tense
   - Present tense
   - Future tense

5. **Special Cases**
   - Greetings
   - Negations
   - Plural pronouns
   - Mixed Singlish + English
   - Technical terms
   - Place names
   - Currency formats
   - Punctuation
   - Slang expressions

### Negative Functional Tests (10)

Tests that validate error handling:

1. **Formatting Issues**
   - Joined words (no spaces)
   - Multiple spaces
   - Line breaks

2. **Input Errors**
   - Misspelled words
   - Ambiguous words
   - Complex nested clauses

3. **Edge Cases**
   - Unusual punctuation
   - Heavy slang with English
   - Date formats
   - Excessive repetition
   - Mixed case abbreviations

### UI Tests (1)

Tests for user interface functionality:
- Real-time translation updates

---

## 🎯 Running Tests

### Basic Commands

```bash
# Run all tests (headless)
npx playwright test

# Run with visible browser
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Interactive UI mode
npx playwright test --ui
```

### Run Specific Test Groups

```bash
# Only positive tests
npm run test:positive

# Only negative tests
npm run test:negative

# Only UI tests
npm run test:ui-tests
```

### Run Individual Tests

```bash
# Run one specific test
npx playwright test --grep "Pos_Fun_0001"

# Run tests matching a pattern
npx playwright test --grep "greeting"
```

### View Reports

```bash
# Generate and open HTML report
npm run report

# Or
npx playwright show-report
```

---

## 📖 Test Details

### Sample Test Cases

#### Pos_Fun_0001: Simple Present Tense
- **Input:** `mama akkalage gedhara yanawa`
- **Expected:** `මම අක්කලගෙ ගෙදර යනව`
- **Category:** Daily language usage
- **Length:** Short (S)

#### Pos_Fun_0004: Interrogative Question
- **Input:** `oyaata kohomadha?`
- **Expected:** `ඔයාට කොහොමද?`
- **Category:** Greeting/question
- **Length:** Short (S)

#### Pos_Fun_0016: Mixed Language
- **Input:** `adha office eeke zoom meeting ekak thiyennee`
- **Expected:** `අද office ඒකෙ zoom meeting එකක් තියෙන්නේ`
- **Category:** Mixed Singlish + English
- **Length:** Medium (M)

#### Neg_Fun_0001: Joined Words Error
- **Input:** `mamagedharayanavaa` (no spaces)
- **Expected:** `මම ගෙදර යනවා`
- **Category:** Typographical error handling
- **Length:** Short (S)

---

## 📊 Understanding Results

### Terminal Output
```
Running 35 tests using 1 worker

  ✓ Pos_Fun_0001 - Convert simple present tense sentence (4.2s)
  ✓ Pos_Fun_0002 - Convert compound sentence with cause (5.1s)
  ✗ Pos_Fun_0003 - Convert complex sentence with condition (3.8s)
  ...

32 passed (2m 45s)
3 failed
```

### What the Results Mean

- ✓ **Passed:** Translation matched expected output exactly
- ✗ **Failed:** Translation differed from expected output

**Note:** Failed tests aren't necessarily "bad" - they show areas where the translator needs improvement!

### HTML Report

The HTML report shows:
- Detailed test results
- Screenshots of failures
- Expected vs. actual outputs
- Test execution timeline
- Filterable by status (passed/failed)

---

## 🛠️ Configuration

### playwright.config.js

Key settings you can adjust:

```javascript
{
  timeout: 60000,           // Max test duration (60 seconds)
  workers: 1,               // Run tests sequentially
  headless: false,          // Show browser (true = hide)
  screenshot: 'only-on-failure',  // When to capture screenshots
  video: 'retain-on-failure',     // When to record video
}
```

### Customizing Timeouts

In the test file (`complete-swift-translator-tests.spec.js`):

```javascript
const CONFIG = {
  timeouts: {
    pageLoad: 2000,        // Wait after page loads
    afterClear: 1000,      // Wait after clearing input
    translation: 3000,     // Wait for translation
    betweenTests: 2000,    // Wait between tests
  }
};
```

---

## 📋 For Your Assignment

### Steps to Document Results

1. **Run all tests:**
   ```bash
   npx playwright test --headed
   ```

2. **Generate report:**
   ```bash
   npx playwright show-report
   ```

3. **Take screenshots:**
   - Overall results summary
   - Each failed test detail
   - Sample passed tests

4. **Update Excel file:**
   - Column F: Copy actual outputs from failed tests
   - Column G: Mark Pass/Fail status
   - Column H: Document the issue/difference

5. **Analyze results:**
   - Count pass/fail
   - Identify patterns in failures
   - Note which categories work best
   - Document improvement suggestions

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| `npm: command not found` | Install Node.js |
| `ENOENT: no such file` | Make sure you're in the right directory |
| All tests timeout | Check internet connection |
| Tests very slow | Normal - includes wait times for stability |
| Browser won't open | Try `--headed` flag or check browser installation |

### Getting More Information

```bash
# Verbose output
npx playwright test --reporter=list --reporter=html

# Slow down execution to watch
# Edit playwright.config.js and add: slowMo: 500

# Run single test with debug
npx playwright test --grep "Pos_Fun_0001" --debug
```

---

## 📚 Resources

- **Playwright Docs:** https://playwright.dev/
- **Swift Translator:** https://www.swifttranslator.com/
- **Node.js:** https://nodejs.org/
- **Test Best Practices:** https://playwright.dev/docs/best-practices

---

## ✅ Success Checklist

- [ ] Node.js installed (v16 or higher)
- [ ] Project folder created
- [ ] Playwright installed
- [ ] Browsers installed (`npx playwright install`)
- [ ] Test file in `tests/` folder
- [ ] Config file in project root
- [ ] Tests run successfully
- [ ] HTML report generated
- [ ] Results documented

---

## 🎓 Tips for Testing

1. **Run tests multiple times** - Network conditions can affect results
2. **Use headed mode** when learning - you can see what's happening
3. **Debug individual tests** - Easier to understand failures
4. **Check the HTML report** - Visual representation of results
5. **Document unexpected behaviors** - These are valuable findings!

---

## 📞 Need Help?

If you encounter issues:

1. Check this README
2. Look at the COMPLETE_SETUP_GUIDE.md
3. Use the QUICK_START_CHEAT_SHEET.md
4. Run tests in debug mode: `npx playwright test --debug`

---

**Happy Testing! 🚀**

Total Test Coverage: 35 tests across all categories
Estimated Run Time: 3-5 minutes for full suite
