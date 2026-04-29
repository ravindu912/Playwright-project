import { test } from '@playwright/test';

test('find correct selectors', async ({ page }) => {
  await page.goto('https://www.pixelssuite.com/chat-translator', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Print ALL textareas
  const textareas = await page.locator('textarea').all();
  console.log('\n===== TEXTAREAS FOUND =====');
  for (const el of textareas) {
    const id  = await el.getAttribute('id');
    const cls = await el.getAttribute('class');
    const ph  = await el.getAttribute('placeholder');
    console.log(`  <textarea id="${id}" class="${cls}" placeholder="${ph}">`);
  }

  // Print ALL inputs
  const inputs = await page.locator('input[type="text"], input:not([type])').all();
  console.log('\n===== TEXT INPUTS FOUND =====');
  for (const el of inputs) {
    const id  = await el.getAttribute('id');
    const cls = await el.getAttribute('class');
    const ph  = await el.getAttribute('placeholder');
    console.log(`  <input id="${id}" class="${cls}" placeholder="${ph}">`);
  }

  // Print ALL divs/p/span that might hold output (look for sinhala-related ids/classes)
  console.log('\n===== POSSIBLE OUTPUT ELEMENTS =====');
  const candidates = await page.locator('div, p, span, pre').all();
  for (const el of candidates) {
    const id  = await el.getAttribute('id')    || '';
    const cls = await el.getAttribute('class') || '';
    const combined = (id + cls).toLowerCase();
    if (
      combined.includes('output') ||
      combined.includes('result') ||
      combined.includes('translat') ||
      combined.includes('sinhala') ||
      combined.includes('chat') ||
      combined.includes('response') ||
      combined.includes('target') ||
      combined.includes('converted')
    ) {
      console.log(`  <${await el.evaluate(e => e.tagName.toLowerCase())} id="${id}" class="${cls}">`);
    }
  }

  // Also print ALL buttons (to find the Chat Sinhala toggle)
  const buttons = await page.locator('button, input[type="button"], input[type="submit"], label, a').all();
  console.log('\n===== BUTTONS/LABELS/LINKS =====');
  for (const el of buttons) {
    const txt = (await el.textContent() || '').trim();
    const id  = await el.getAttribute('id')    || '';
    const cls = await el.getAttribute('class') || '';
    if (txt.length > 0 && txt.length < 60) {
      console.log(`  [${await el.evaluate(e => e.tagName)}] id="${id}" class="${cls}" text="${txt}"`);
    }
  }

  // Take a screenshot so we can see the page
  await page.screenshot({ path: 'selector-debug.png', fullPage: true });
  console.log('\n✅ Screenshot saved as selector-debug.png');
});
