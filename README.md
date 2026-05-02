# 🧪 Pixelssuite Chat Translator – Transliteration Accuracy Testing

Automated Playwright test suite for evaluating the **Chat Sinhala** transliteration accuracy of [Pixelssuite Chat Translator](https://www.pixelssuite.com/chat-translator).

## 📋 Assignment Objective

Assess how accurately the Pixelssuite Chat Translator converts **chat-style Singlish** (informal romanized Sinhala) input into correct **Sinhala script** output. This suite contains **50 negative test cases** — inputs where the system **fails** to produce the correct Sinhala transliteration.

## 📊 Test Coverage

| Test Type | Count | Description |
|-----------|-------|-------------|
| ❌ Negative Functional | **50** | Inputs where the system fails to produce correct Sinhala |

### Singlish Input Categories (24 types, 2+ test cases each)

| # | Category | Test Case IDs |
|---|----------|---------------|
| 1 | Question Forms | Neg_0001, Neg_0002 |
| 2 | Command Forms | Neg_0003, Neg_0004 |
| 3 | Greetings | Neg_0005, Neg_0006 |
| 4 | Requests | Neg_0007, Neg_0008 |
| 5 | Responses | Neg_0009, Neg_0010 |
| 6 | Repeated Words | Neg_0011, Neg_0012 |
| 7 | Inputs with Punctuation Marks | Neg_0013, Neg_0014 |
| 8 | Romanization / Spelling Variants | Neg_0015, Neg_0016 |
| 9 | Isolated English Word Insertions in Singlish | Neg_0017, Neg_0018 |
| 10 | Multi-Word English Phrases in Singlish | Neg_0019, Neg_0020 |
| 11 | English Digital Terms in Singlish | Neg_0021, Neg_0022 |
| 12 | Platform/App Names in Singlish | Neg_0023, Neg_0024 |
| 13 | English Abbreviations/Acronyms in Singlish | Neg_0025, Neg_0026 |
| 14 | English Clipped Forms in Singlish | Neg_0027, Neg_0028 |
| 15 | Place Names Embedded in Singlish | Neg_0029, Neg_0030 |
| 16 | Person Names Embedded in Singlish | Neg_0031, Neg_0032 |
| 17 | Inputs with Numbers and Numeric Suffixes | Neg_0033, Neg_0034 |
| 18 | Inputs with Currency | Neg_0035, Neg_0036 |
| 19 | Inputs with Time Formats | Neg_0037, Neg_0038 |
| 20 | Inputs with Dates | Neg_0039, Neg_0040 |
| 21 | Inputs with Unit of Measurements | Neg_0041, Neg_0042 |
| 22 | Inputs with Slang and Casual Phrasing | Neg_0043, Neg_0044 |
| 23 | Online Identifiers in Singlish | Neg_0045, Neg_0046 |
| 24 | Inputs Containing Emojis | Neg_0047 – Neg_0050 |

---

## 🚀 Quick Start

### 1️⃣ Install Node.js
Download and install from: https://nodejs.org/ (LTS version)

### 2️⃣ Set Up Project
```bash
# Clone the repository
git clone <repository-url>
cd Playwright-project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### 3️⃣ Project Structure
```
Playwright-project/
├── tests/
│   ├── swift.spec.js            # 50 negative test cases
│   ├── playwright.config.js     # Playwright configuration
│   └── playwright-report/       # HTML test report (auto-generated)
├── package.json
├── IT23202986.txt
├── It23202986.xlsx              # Test case documentation (Excel)
└── README.md
```

### 4️⃣ Run Tests
```bash
# Run all 50 tests (headless)
npx playwright test tests/swift.spec.js --config=tests/playwright.config.js

# Run with visible browser
npx playwright test tests/swift.spec.js --config=tests/playwright.config.js --headed

# Run on Chromium only (faster)
npx playwright test tests/swift.spec.js --config=tests/playwright.config.js --project=chromium
```

---

## 🔍 How the Tests Work

### Test Logic (Negative Testing)

Each test case represents an input where the Chat Sinhala transliterator **fails** to produce the correct output.

```
1. Navigate to https://www.pixelssuite.com/chat-translator
2. Activate "Chat Sinhala" mode via Transliteration dropdown
3. Enter a Singlish input into the textarea
4. Click the "Transliterate" button
5. Read the system's actual output
6. Compare actual output with the ideal correct Sinhala
7. Assert: actual output ≠ expected correct Sinhala (system fails = test PASSES)
```

### Pass/Fail Criteria

| Scenario | Playwright Test Result | Meaning |
|----------|----------------------|---------|
| System output ≠ ideal correct Sinhala | ✅ **PASS** | Defect confirmed — system fails on this input |
| System output = ideal correct Sinhala | ❌ **FAIL** | No defect — system got it right (not a valid negative case) |

---

## 📝 Sample Test Cases

### Neg_0001: Question Form
- **Input:** `oya koheda giyanney?`
- **Ideal Expected:** `ඔයා කොහෙද ගියා නේ?`
- **Category:** Question Forms
- **Length:** Short (S)
- **Result:** System produces incorrect transliteration → PASS

### Neg_0015: Romanization Variant
- **Input:** `mama heta skool yanna one.`
- **Ideal Expected:** `මම හෙට ස්කූල් යන්න ඕනේ.`
- **Category:** Romanization / Spelling Variants
- **Length:** Short (S)
- **Result:** System fails to handle informal spelling "skool" → PASS

### Neg_0047: Emoji Input
- **Input:** `godak sthuthi bro 🙏`
- **Ideal Expected:** `ගොඩක් ස්තූතියි bro 🙏`
- **Category:** Inputs Containing Emojis
- **Length:** Short (S)
- **Result:** System fails to correctly transliterate alongside emojis → PASS

---

## 🎯 Running Tests

### Basic Commands

```bash
# Run all tests (headless)
npx playwright test tests/swift.spec.js --config=tests/playwright.config.js

# Run with visible browser
npx playwright test tests/swift.spec.js --config=tests/playwright.config.js --headed

# Debug mode
npx playwright test tests/swift.spec.js --config=tests/playwright.config.js --debug

# Interactive UI mode
npx playwright test tests/swift.spec.js --config=tests/playwright.config.js --ui
```

### Run Individual Tests

```bash
# Run one specific test case
npx playwright test --config=tests/playwright.config.js --grep "Neg_0001"

# Run tests matching a category
npx playwright test --config=tests/playwright.config.js --grep "Question forms"
```

### View Reports

```bash
# Open the HTML report
npx playwright show-report tests/playwright-report

# Or open the file directly in your browser
# tests/playwright-report/index.html
```

---

## 📊 Understanding Results

### Terminal Output
```
Running 50 tests using 1 worker

  ✓ Neg_0001 | Question forms (S) – "oya koheda giyanney?" (12.5s)
  ✓ Neg_0002 | Question forms (S) – "mokatei mewa karanne?" (11.8s)
  ...

50 passed (10m 30s)
```

### Console Log for Each Test
```
[Neg_0001] Input              : oya koheda giyanney?
[Neg_0001] Ideal Expected     : ඔයා කොහෙද ගියා නේ?
[Neg_0001] Actual System Output: ඔයා කොහෙද ගියන්නෑ?
[Neg_0001] Status             : PASS
────────────────────────────────────────────────────────────────
```

### HTML Report

The HTML report (at `tests/playwright-report/index.html`) shows:
- Detailed test results for all 50 cases
- Expected vs. actual output comparison
- Screenshots of any failures
- Test execution timeline
- Filterable by status (passed/failed)

---

## 🛠️ Configuration

### Timeouts (in swift.spec.js)

```javascript
const CONFIG = {
  timeouts: {
    pageLoad: 5000,       // Wait after page loads (ms)
    translation: 4000,    // Wait for transliteration result (ms)
    betweenTests: 500     // Wait between tests (ms)
  }
};
```

### Playwright Config (tests/playwright.config.js)

Key settings:
- **testDir:** `./` (tests directory)
- **fullyParallel:** `true`
- **reporter:** `html` (generates HTML report)
- **browsers:** Chromium, Firefox, WebKit

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm: command not found` | Install Node.js from https://nodejs.org/ |
| Tests timeout | Check internet connection; increase `translation` timeout |
| Report not opening | Use `npx playwright show-report tests/playwright-report` |
| Browser won't open | Run `npx playwright install` to install browsers |
| Tests very slow | Normal — each test navigates to the site and waits for translation |
| All tests FAIL | System may be producing correct output; test cases need updating |

---

## 📚 Resources

- **Playwright Docs:** https://playwright.dev/
- **Pixelssuite Chat Translator:** https://www.pixelssuite.com/chat-translator
- **Node.js:** https://nodejs.org/
- **Test Best Practices:** https://playwright.dev/docs/best-practices

---

## ✅ Checklist

- [x] Node.js installed (v16 or higher)
- [x] Playwright installed with browsers
- [x] 50 negative test cases covering all 24 Singlish input types
- [x] Test file: `tests/swift.spec.js`
- [x] Config file: `tests/playwright.config.js`
- [ ] Tests run successfully (all 50 pass)
- [ ] HTML report generated
- [ ] Excel file (It23202986.xlsx) updated with results
- [ ] Results analyzed and documented

---

**Student ID:** IT23202986  
**Test Suite:** 50 Negative Test Cases  
**Estimated Run Time:** 8–12 minutes for full suite  
