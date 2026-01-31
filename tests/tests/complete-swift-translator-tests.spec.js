const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - All Your Test Cases (35 Total)
const TEST_DATA = {
  positive: [
    {
      tcId: 'Pos_Fun_0001',
      name: 'Convert simple present tense sentence',
      input: 'mama akkalage gedhara yanavaa',
      expected: 'මම අක්කලගෙ ගෙදර යනවා',
      category: '• Daily language usage\n• Simple sentence\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0002',
      name: 'Convert compound sentence with cause',
      input: 'mama akkalage gedhara yanava haebaeyi kaalaa ivara naethi nisaa dhaenma yanne naee',
      expected: 'මම අක්කලගෙ ගෙදර යනව හැබැයි කාලා ඉවර නැති නිසා දැන්ම යන්නෙ නෑ',
      category: '• Daily language usage\n• Compound sentence\n• M (31–299 characters)\n• Accuracy validation',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0003',
      name: 'Convert complex sentence with condition',
      input: 'oya eeka gannakam mama balan innavaa',
      expected: 'ඔය ඒක ගන්නකම් මම බලන් ඉන්නවා',
      category: '• Daily language usage\n• Complex sentence\n• M (31–299 characters)\n• Accuracy validation',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0004',
      name: 'Convert interrogative question form',
      input: 'oyaata kohomadha?',
      expected: 'ඔයාට කොහොමද?',
      category: '• Greeting / request / response\n• Interrogative (question)\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0005',
      name: 'Convert imperative command form',
      input: 'vahaama pitavenna',
      expected: 'වහාම පිටවෙන්න',
      category: '• Daily language usage\n• Imperative (command)\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0006',
      name: 'Convert positive affirmative sentence',
      input: 'mama ehema karanavaa.',
      expected: 'මම එහෙම කරනවා.',
      category: '• Daily language usage\n• Simple sentence\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0007',
      name: 'Convert negative sentence form',
      input: 'mama ehema karannee naehae.',
      expected: 'මම එහෙම කරන්නේ නැහැ.',
      category: '• Daily language usage\n• Negation (negative form)\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0008',
      name: 'Convert greeting phrase',
      input: 'aayuboovan!',
      expected: 'ආයුබෝවන්!',
      category: '• Greeting / request / response\n• Simple sentence\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0009',
      name: 'Convert polite request form',
      input: 'karuNaakaralaa oyaalaa poddak kata vahaganna puLuvandha?',
      expected: 'කරුණාකරලා ඔයාලා පොඩ්ඩක් කට වහගන්න පුළුවන්ද?',
      category: '• Greeting / request / response\n• Interrogative (question)\n• M (31–299 characters)\n• Accuracy validation',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0010',
      name: 'Convert informal phrasing',
      input: 'eeyi, mata ooka dhiyan.',
      expected: 'ඒයි, මට ඕක දියන්.',
      category: '• Slang / informal language\n• Imperative (command)\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0011',
      name: 'Convert multi-word expression',
      input: 'poddak inna',
      expected: 'පොඩ්ඩක් ඉන්න',
      category: '• Word combination / phrase pattern\n• Imperative (command)\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0012',
      name: 'Convert repeated word for emphasis',
      input: 'hari hari',
      expected: 'හරි හරි',
      category: '• Word combination / phrase pattern\n• Simple sentence\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0013',
      name: 'Convert past tense sentence',
      input: 'mama iiye ooka karaa',
      expected: 'මම ඊයෙ ඕක කරා',
      category: '• Daily language usage\n• Past tense\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0014',
      name: 'Convert future tense sentence',
      input: 'mama heta enavaa.',
      expected: 'මම හෙට එනවා.',
      category: '• Daily language usage\n• Future tense\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0015',
      name: 'Convert plural pronoun sentence',
      input: 'api yamu.',
      expected: 'අපි යමු.',
      category: '• Daily language usage\n• Plural form\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0016',
      name: 'Convert sentence with English technical terms',
      input: 'adha office eeke zoom meeting ekak thiyennee',
      expected: 'අද office ඒකෙ zoom meeting එකක් තියෙන්නේ',
      category: '• Mixed Singlish + English\n• Simple sentence\n• M (31–299 characters)\n• Accuracy validation',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0017',
      name: 'Convert sentence with place names',
      input: 'api dhennaa Colombo yanna hadhannee',
      expected: 'අපි දෙන්නා Colombo යන්න හදන්නේ',
      category: '• Names / places / common English words\n• Simple sentence\n• M (31–299 characters)\n• Accuracy validation',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0018',
      name: 'Convert sentence with English abbreviations',
      input: 'mata ID eka pennanna',
      expected: 'මට ID එක පෙන්නන්න',
      category: '• Names / places / common English words\n• Imperative (command)\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0019',
      name: 'Convert sentence with punctuation',
      input: 'sellam karanna enne naedhdha?',
      expected: 'සෙල්ලම් කරන්න එන්නෙ නැද්ද?',
      category: '• Punctuation / numbers\n• Interrogative (question)\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0020',
      name: 'Convert sentence with currency format',
      input: 'mata Rs. 5000 oonee.',
      expected: 'මට Rs. 5000 ඕනේ.',
      category: '• Punctuation / numbers\n• Simple sentence\n• S (≤30 characters)\n• Accuracy validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0021',
      name: 'Convert input with multiple spaces',
      input: 'mama    gedhara    yanavaa.',
      expected: 'මම    ගෙදර    යනවා.',
      category: '• Formatting (spaces / line breaks / paragraph)\n• Simple sentence\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0022',
      name: 'Convert slang expression',
      input: 'ela machan! supiri!!',
      expected: 'එල මචන්! සුපිරි!!',
      category: '• Slang / informal language\n• Simple sentence\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_0023',
      name: 'Convert medium-length daily conversation',
      input: 'mata nidhimathayi ,mama aedha as karala hodhata nidhaa gannavaa . mama oyaata heta call ekak dhennam',
      expected: 'මට නිදිමතයි ,මම ඇද අස් කරල හොදට නිදා ගන්නවා . මම ඔයාට හෙට call එකක් දෙන්නම්',
      category: '• Daily language usage\n• Compound sentence\n• M (31–299 characters)\n• Accuracy validation',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_0024',
      name: 'Convert long paragraph input',
      input: 'apee cricket team eka eeye tharagaya paraajaya viimata heethuva maedha pela kriidakayan hariyata sellam nokiriimayi. paethum nissanka pamaNak lakunu 100 k labaa gaththaa. anek kriidakayan hariyata lakunu labaa noganiima nisaa lankaava tharagaya paraajaya unaa.pandhu yavannan atharin eshaan maalinga wicket  3 k labaa gaththaa, namuth England kaNdaayama hodhin kriidaa kara tharagaya dhinnaa.',
      expected: 'අපේ cricket team එක ඒයෙ තරගය පරාජය වීමට හේතුව මැද පෙල ක්‍රීඩකයන් හරියට සෙල්ලම් නොකිරීමයි. පැතුම් නිස්සන්ක පමණක් ලකුනු 100 ක් ලබා ගත්තා. අනෙක් ක්‍රීඩකයන් හරියට ලකුනු ලබා නොගනීම නිසා ලන්කාව තරගය පරාජය උනා.පන්දු යවන්නන් අතරින් එශාන් මාලින්ග wicket  3 ක් ලබා ගත්තා, නමුත් England කණ්ඩායම හොදින් ක්‍රීඩා කර තරගය දින්නා.',
      category: '• Daily language usage\n• Complex sentence\n• L (≥300 characters)\n• Robustness validation',
      length: 'L'
    }
  ],
  
  negative: [
    {
      tcId: 'Neg_Fun_0001',
      name: 'Joined words without spaces fail conversion',
      input: 'mamagedharayanavaa',
      expected: 'මම ගෙදර යනවා',
      category: '• Typographical error handling\n• Simple sentence\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0002',
      name: 'Misspelled Singlish word causes incorrect output',
      input: 'mama gedhra yanavaa.',
      expected: 'මම ගෙදර යනවා.',
      category: '• Typographical error handling\n• Simple sentence\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0003',
      name: 'Complex nested clause fails accurate conversion',
      input: 'Iye mama kiyawapu potha liyapu katuwaraya ada ape pasalata peminiya.',
      expected: 'ඊයේ මම කියවපු පොත ලියපු කතුවරයා අද අපේ පාසලට පැමිණියා.',
      category: '• Daily language usage\n• Complex sentence\n• M (31–299 characters)\n• Robustness validation',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0004',
      name: 'Unusual punctuation combination fails',
      input: 'oyaa enavadha?!?!',
      expected: 'ඔයා එනවද?!?!',
      category: '• Punctuation / numbers\n• Interrogative (question)\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0005',
      name: 'Ambiguous word produces wrong translation',
      input: 'mamakannahadhannee.',
      expected: 'මම කන්න හදන්නේ.',
      category: '• Daily language usage\n• Simple sentence\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0006',
      name: 'Heavy slang with mixed English fails',
      input: 'adoo bro eka totally wrong vadak, literally yako.. shocked vunaa yako.',
      expected: 'අඩෝ bro එක totally wrong වැඩක්, literally යකො.. shocked වුනා යකො.',
      category: '• Slang / informal language\n• Compound sentence\n• M (31–299 characters)\n• Robustness validation',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0007',
      name: 'Date format variation not preserved correctly',
      input: 'heta 2026-05-21yanna.',
      expected: 'හෙට 2026-05-21 යන්න.',
      category: '• Punctuation / numbers\n• Simple sentence\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0008',
      name: 'Line breaks cause incomplete conversion',
      input: 'mama gedhara yanavaa.  oyaa enavadha maath ekka yanna?',
      expected: 'මම ගෙදර යනවා.\nඔයා එනවද මාත් එක්ක යන්න?',
      category: '• Formatting (spaces / line breaks / paragraph)\n• Compound sentence\n• M (31–299 characters)\n• Robustness validation',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_0009',
      name: 'Excessive repetition breaks conversion',
      input: 'hari  hari  hari  hari  hari',
      expected: 'හරි හරි හරි හරි හරි',
      category: '• Word combination / phrase pattern\n• Simple sentence\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_0010',
      name: 'Mixed case English abbreviation fails',
      input: 'mata OtP eka evanna.',
      expected: 'මට OTP එක එවන්න.',
      category: '• Names / places / common English words\n• Imperative (command)\n• S (≤30 characters)\n• Robustness validation',
      length: 'S'
    }
  ],
  
  ui: {
    tcId: 'Pos_UI_0001',
    name: 'Real-time output updates as user types',
    input: 'mama gedhara yanavaa',
    partialInput: 'mama gedh',
    expectedFull: 'Sinhala output should update automatically while typing without any button click, displaying: මම ගෙදර යනවා',
    category: '• Usability flow (real-time conversion)\n• Simple sentence\n• S (≤30 characters)\n• Real-time output update behavior',
    length: 'S'
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Complete Test Suite (35 Test Cases)', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests (24 tests)
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests (10 tests)
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test (1 test)
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify output is being updated (real-time functionality)
      outputText = await translator.getOutputText();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
