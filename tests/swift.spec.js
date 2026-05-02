import { test, expect } from '@playwright/test';

const CONFIG = {
  url: 'https://www.pixelssuite.com/chat-translator',
  timeouts: {
    pageLoad: 5000,
    translation: 4000,
    betweenTests: 500
  }
};

// Selectors confirmed by manual inspection of pixelssuite.com/chat-translator
const SELECTORS = {
  input: 'textarea[placeholder*="English"]',
  output: 'textarea[placeholder*="Sinhala"]',
  translateBtn: 'button.btn',
  // "Chat Sinhala" mode is under the Transliteration dropdown in the nav
  modeDropdown: 'text=Transliteration',
  chatSinhala: 'text=Chat Sinhala'
};

// 50 Negative Test Cases – inputs where the system FAILS to produce the correct Sinhala.
// The "expected" field is the IDEAL correct Sinhala output.
// The test PASSES when the system's actual output does NOT match this ideal value,
// thereby proving the system has a transliteration defect for that input.
const TEST_DATA = [
  // 1) Question forms
  { tcId: 'Neg_0001', type: 'Question forms', length: 'S', input: 'oya koheda giyanney?', expected: 'ඔයා කොහෙද ගියා නේ?' },
  { tcId: 'Neg_0002', type: 'Question forms', length: 'S', input: 'mokatei mewa karanne?', expected: 'මොකටෙයි මේවා කරන්නේ?' },

  // 2) Command forms
  { tcId: 'Neg_0003', type: 'Command forms', length: 'S', input: 'dora arala, eliyata yanna epa.', expected: 'දොර ඇරලා, එළියට යන්න එපා.' },
  { tcId: 'Neg_0004', type: 'Command forms', length: 'S', input: 'potha gena enna, patan gamu.', expected: 'පොත ගෙන එන්න, පටන් ගමු.' },

  // 3) Greetings
  { tcId: 'Neg_0005', type: 'Greetings', length: 'S', input: 'kohomada bro, oyata honda da?', expected: 'කොහොමද bro, ඔයාට හොඳ ද?' },
  { tcId: 'Neg_0006', type: 'Greetings', length: 'S', input: 'suba udesanak wewa machan!', expected: 'සුබ උදෑසනක් වේවා මචං!' },

  // 4) Requests
  { tcId: 'Neg_0007', type: 'Requests', length: 'S', input: 'karunakarala mata udaw karanna puluwanda?', expected: 'කරුණාකරලා මට උදව් කරන්න පුලුවන්ද?' },
  { tcId: 'Neg_0008', type: 'Requests', length: 'S', input: 'oyage wathura bothalaya mata denna.', expected: 'ඔයාගේ වතුර බෝතලය මට දෙන්න.' },

  // 5) Responses
  { tcId: 'Neg_0009', type: 'Responses', length: 'S', input: 'ow ow, mama danne eka.', expected: 'ඔව් ඔව්, මම දන්නේ එක.' },
  { tcId: 'Neg_0010', type: 'Responses', length: 'S', input: 'aiyo, mata thiyanney naha eka.', expected: 'අයියෝ, මට තියෙන්නේ නැහැ එක.' },

  // 6) Repeated Words
  { tcId: 'Neg_0011', type: 'Repeated Words', length: 'S', input: 'hema hema dawasama enna one.', expected: 'හැම හැම දවසම එන්න ඕනේ.' },
  { tcId: 'Neg_0012', type: 'Repeated Words', length: 'S', input: 'oya wage oya wage karanna baha.', expected: 'ඔයා වගේ ඔයා වගේ කරන්න බැහැ.' },

  // 7) Punctuation Marks
  { tcId: 'Neg_0013', type: 'Inputs with Punctuation Marks', length: 'S', input: 'mama yannam... oyath enawada?', expected: 'මම යන්නම්... ඔයාත් එනවද?' },
  { tcId: 'Neg_0014', type: 'Inputs with Punctuation Marks', length: 'S', input: 'ane! poddak inna; mama ennam!', expected: 'අනේ! පොඩ්ඩක් ඉන්න; මම එන්නම්!' },

  // 8) Romanization/Spelling Variants
  { tcId: 'Neg_0015', type: 'Romanization / Spelling Variants', length: 'S', input: 'mama heta skool yanna one.', expected: 'මම හෙට ස්කූල් යන්න ඕනේ.' },
  { tcId: 'Neg_0016', type: 'Romanization / Spelling Variants', length: 'S', input: 'eyaa godak lassanai, sathuta.', expected: 'එයා ගොඩක් ලස්සනයි, සතුට.' },

  // 9) Isolated English Word Insertions
  { tcId: 'Neg_0017', type: 'Isolated English Word Insertions in Singlish', length: 'S', input: 'oya mage assignment eka check karada?', expected: 'ඔයා මගේ assignment එක check කරාද?' },
  { tcId: 'Neg_0018', type: 'Isolated English Word Insertions in Singlish', length: 'S', input: 'oya mage laptop eka denna puluwanda?', expected: 'ඔයා මගේ laptop එක දෙන්න පුලුවන්ද?' },

  // 10) Multi-Word English Phrases
  { tcId: 'Neg_0019', type: 'Multi-Word English Phrases in Singlish', length: 'M', input: 'mama late karana nisa please wait for me.', expected: 'මම late කරන නිසා please wait for me.' },
  { tcId: 'Neg_0020', type: 'Multi-Word English Phrases in Singlish', length: 'M', input: 'api ada out of stock, sorry for the inconvenience.', expected: 'අපි අද out of stock, sorry for the inconvenience.' },

  // 11) English Digital Terms
  { tcId: 'Neg_0021', type: 'English Digital Terms in Singlish', length: 'S', input: 'oyage bluetooth eka on karada?', expected: 'ඔයාගේ bluetooth එක on කරාද?' },
  { tcId: 'Neg_0022', type: 'English Digital Terms in Singlish', length: 'S', input: 'mama screenshot eka gaththa, balanna.', expected: 'මම screenshot එක ගත්තා, බලන්න.' },

  // 12) Platform/App Names
  { tcId: 'Neg_0023', type: 'Platform/App Names in Singlish', length: 'S', input: 'mata Instagram reel eka ewanna.', expected: 'මට Instagram reel එක එවන්න.' },
  { tcId: 'Neg_0024', type: 'Platform/App Names in Singlish', length: 'S', input: 'oya Google Maps balala yanawada?', expected: 'ඔයා Google Maps බලලා යනවද?' },

  // 13) English Abbreviations/Acronyms
  { tcId: 'Neg_0025', type: 'English Abbreviations/Acronyms in Singlish', length: 'S', input: 'API eka sari naha, error enawa.', expected: 'API එක සරි නැහැ, error එනවා.' },
  { tcId: 'Neg_0026', type: 'English Abbreviations/Acronyms in Singlish', length: 'S', input: 'PIN eka dannawa da, ATM card eka gawa.', expected: 'PIN එක දන්නවා ද, ATM card එක ගාව.' },

  // 14) English Clipped Forms
  { tcId: 'Neg_0027', type: 'English Clipped Forms in Singlish', length: 'M', input: 'mama uni yana kalata bag eka gena yannam.', expected: 'මම uni යන කාලෙට bag එක ගෙන යන්නම්.' },
  { tcId: 'Neg_0028', type: 'English Clipped Forms in Singlish', length: 'S', input: 'ape gym session eka cancel karannam.', expected: 'අපේ gym session එක cancel කරන්නම්.' },

  // 15) Place Names
  { tcId: 'Neg_0029', type: 'Place Names Embedded in Singlish', length: 'S', input: 'api weekend eke Kandy yamu.', expected: 'අපි weekend එකේ Kandy යමු.' },
  { tcId: 'Neg_0030', type: 'Place Names Embedded in Singlish', length: 'S', input: 'mama Nugegoda bus halt eka langa inna.', expected: 'මම Nugegoda bus halt එක ළඟ ඉන්න.' },

  // 16) Person Names
  { tcId: 'Neg_0031', type: 'Person Names Embedded in Singlish', length: 'S', input: 'Kasun kiwwa heta class naha kiyala.', expected: 'Kasun කිව්වා හෙට class නැහැ කියලා.' },
  { tcId: 'Neg_0032', type: 'Person Names Embedded in Singlish', length: 'S', input: 'Nimal saha Dilani dennama awa.', expected: 'Nimal සහ Dilani දෙන්නම ආවා.' },

  // 17) Numbers and Numeric Suffixes
  { tcId: 'Neg_0033', type: 'Inputs with Numbers and Numeric Suffixes', length: 'S', input: 'mama 3rd floor eke inna, lift eka naha.', expected: 'මම 3rd floor එකේ ඉන්න, lift එක නැහැ.' },
  { tcId: 'Neg_0034', type: 'Inputs with Numbers and Numeric Suffixes', length: 'S', input: 'api 5k run karanna plan karanawa.', expected: 'අපි 5k run කරන්න plan කරනවා.' },

  // 18) Currency
  { tcId: 'Neg_0035', type: 'Inputs with Currency', length: 'S', input: 'e saree eka Rs. 4500 da? godak ganan.', expected: 'ඒ සාරිය එක Rs. 4500 ද? ගොඩක් ගණන්.' },
  { tcId: 'Neg_0036', type: 'Inputs with Currency', length: 'M', input: 'USD 50 kiyanne Lankan rupiyal walata kochcharada?', expected: 'USD 50 කියන්නේ Lankan රුපියල් වලට කොච්චරද?' },

  // 19) Time Formats
  { tcId: 'Neg_0037', type: 'Inputs with Time Formats', length: 'M', input: 'api 6:00AM patan ganna one, late wenna epa.', expected: 'අපි 6:00AM පටන් ගන්න ඕනේ, late වෙන්න එපා.' },
  { tcId: 'Neg_0038', type: 'Inputs with Time Formats', length: 'S', input: 'heta 8.30am walata enna puluwanda?', expected: 'හෙට 8.30am වලට එන්න පුළුවන්ද?' },

  // 20) Dates
  { tcId: 'Neg_0039', type: 'Inputs with Dates', length: 'S', input: 'March 31 wenakan submit karanna one.', expected: 'March 31 වෙනකන් submit කරන්න ඕනේ.' },
  { tcId: 'Neg_0040', type: 'Inputs with Dates', length: 'S', input: '2025-12-25ta special dinner eka hadamu.', expected: '2025-12-25ට special dinner එක හදමු.' },

  // 21) Unit of Measurements
  { tcId: 'Neg_0041', type: 'Inputs with Unit of Measurements', length: 'S', input: 'e bag eka kg 10k withara bara.', expected: 'ඒ bag එක kg 10ක් විතර බර.' },
  { tcId: 'Neg_0042', type: 'Inputs with Unit of Measurements', length: 'S', input: 'school eka me gedaren km 2k withara.', expected: 'school එක මේ ගෙදරින් km 2ක් විතර.' },

  // 22) Slang and Casual Phrasing
  { tcId: 'Neg_0043', type: 'Inputs with Slang and Casual Phrasing', length: 'S', input: 'yakko meka patta wahanse, kiyanna baha.', expected: 'යක්කෝ මේක පට්ට වහන්සේ, කියන්න බැහැ.' },
  { tcId: 'Neg_0044', type: 'Inputs with Slang and Casual Phrasing', length: 'M', input: 'uba salli naha kiyala ape set eke kiyanna epa.', expected: 'උඹ සල්ලි නැහැ කියලා අපේ set එකේ කියන්න එපා.' },

  // 23) Online Identifiers
  { tcId: 'Neg_0045', type: 'Online Identifiers in Singlish', length: 'M', input: 'mata me link eka ewanna: www.google.lk', expected: 'මට මේ link එක එවන්න: www.google.lk' },
  { tcId: 'Neg_0046', type: 'Online Identifiers in Singlish', length: 'S', input: '@Kavinda bro, oya group eke add una da?', expected: '@Kavinda bro, ඔයා group එකේ add වුණා ද?' },

  // 24) Inputs Containing Emojis
  { tcId: 'Neg_0047', type: 'Inputs Containing Emojis', length: 'S', input: 'godak sthuthi bro 🙏', expected: 'ගොඩක් ස්තූතියි bro 🙏' },
  { tcId: 'Neg_0048', type: 'Inputs Containing Emojis', length: 'S', input: 'mama thawa inna baha 😭 yannam.', expected: 'මම තව ඉන්න බැහැ 😭 යන්නම්.' },
  { tcId: 'Neg_0049', type: 'Inputs Containing Emojis', length: 'S', input: 'meka wada karana naha 🤦 amaru.', expected: 'මේක වැඩ කරන්නේ නැහැ 🤦 අමාරුයි.' },
  { tcId: 'Neg_0050', type: 'Inputs Containing Emojis', length: 'S', input: 'oya meka dunna nisa godak pin 💕', expected: 'ඔයා මේක දුන්න නිසා ගොඩක් පින් 💕' }
];

// ─── Helper: activate Chat Sinhala mode via dropdown ─────────────────────────
async function activateChatSinhalaMode(page) {
  // Click the "Transliteration" dropdown in the nav bar
  const dropdown = page.locator(SELECTORS.modeDropdown).first();
  if (await dropdown.count() > 0) {
    await dropdown.click();
    await page.waitForTimeout(500);
    // Click "Chat Sinhala" option
    const chatOption = page.locator(SELECTORS.chatSinhala).first();
    if (await chatOption.count() > 0) {
      await chatOption.click();
      await page.waitForTimeout(500);
    }
  }
}

// ─── Main describe block ─────────────────────────────────────────────────────
test.describe('Pixelssuite Chat Translator – 50 Negative Test Cases', () => {

  // Load the page fresh for every test
  test.beforeEach(async ({ page }) => {
    await page.goto(CONFIG.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(CONFIG.timeouts.pageLoad);
    await activateChatSinhalaMode(page);
  });

  // ─── Generate one test per test case ───────────────────────────────────────
  for (const tc of TEST_DATA) {
    test(`${tc.tcId} | ${tc.type} (${tc.length}) – "${tc.input}"`, async ({ page }) => {

      // 1. Wait for the input textarea and clear it
      const inputField = page.locator(SELECTORS.input).first();
      await inputField.waitFor({ state: 'visible', timeout: 10000 });
      await inputField.click();
      await inputField.fill('');
      await inputField.fill(tc.input);

      // 2. Click the Transliterate button to trigger translation
      const translateBtn = page.locator(SELECTORS.translateBtn).first();
      await translateBtn.waitFor({ state: 'visible', timeout: 5000 });
      await translateBtn.click();

      // 3. Wait for translation to complete
      await page.waitForTimeout(CONFIG.timeouts.translation);

      // 4. Read the output textarea value
      const outputEl = page.locator(SELECTORS.output).first();
      await outputEl.waitFor({ state: 'visible', timeout: 8000 });
      const actualOutput = (await outputEl.inputValue()).trim();

      // 5. Determine PASS/FAIL for NEGATIVE test cases:
      //    These are cases where we EXPECT the system to produce WRONG output.
      //    PASS = system output does NOT match the ideal correct Sinhala (defect confirmed)
      //    FAIL = system output unexpectedly matches the ideal (no defect found)
      const isDefectConfirmed = actualOutput !== tc.expected;
      const status = isDefectConfirmed ? 'PASS' : 'FAIL';

      console.log(`[${tc.tcId}] Input              : ${tc.input}`);
      console.log(`[${tc.tcId}] Ideal Expected     : ${tc.expected}`);
      console.log(`[${tc.tcId}] Actual System Output: ${actualOutput}`);
      console.log(`[${tc.tcId}] Status             : ${status}`);
      console.log('─'.repeat(60));

      // 6. Assert – NEGATIVE test: the system should NOT produce the correct output.
      //    If actualOutput equals expected, the system got it right and this test case
      //    is invalid as a "failure case", so the Playwright test fails.
      expect(actualOutput).not.toBe(tc.expected);

      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  }
});