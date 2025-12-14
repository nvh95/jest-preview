import fs from 'fs';
import path from 'path';
import { CACHE_FOLDER } from './constants';

/**
 * Materialize CSSOM-inserted rules into textContent for <style> tags
 * that currently look empty.
 */
export function materializeCssomIntoText() {
  const styles = document.querySelectorAll<HTMLStyleElement>('style');
  for (let i = 0; i < styles.length; i++) {
    const styleElement = styles[i];

    // Skip if it already has non-whitespace text
    const hadText =
      !!styleElement.textContent && styleElement.textContent.trim().length > 0;
    if (hadText) continue;

    // Try to read CSSOM and write once
    const sheet = styleElement.sheet as CSSStyleSheet | null;
    if (!sheet) continue;

    try {
      const rules = sheet.cssRules; // may throw for cross-origin (rare for <style>)
      const out = new Array<string>(rules.length);
      for (let j = 0; j < rules.length; j++) out[j] = rules[j].cssText;
      styleElement.textContent = out.join('\n');
    } catch {
      // ignore unreadable sheets
    }
  }
}

export function debug(): void {
  materializeCssomIntoText();
  if (!fs.existsSync(CACHE_FOLDER)) {
    fs.mkdirSync(CACHE_FOLDER, {
      recursive: true,
    });
  }

  fs.writeFileSync(
    path.join(CACHE_FOLDER, 'index.html'),
    document.documentElement.outerHTML,
  );
}
