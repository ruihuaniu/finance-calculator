/**
 * Tests that exercise FinCalc's REAL calculation functions straight out of
 * index.html — no separate finance.js module required.
 *
 * Strategy:
 *   1. Read index.html and pull out the inline <script> source.
 *   2. Run it inside a Function whose scope contains a minimal fake DOM
 *      (document.getElementById / querySelectorAll / createElement, plus
 *      element stubs with .value / .textContent / .style / .classList /
 *      addEventListener). The script defines calculate(), calculateInvestment(),
 *      loanType, FREQ_LABELS, etc. in that scope.
 *   3. The harness returns those symbols so the tests below can drive them
 *      directly and read back results from the fake result elements.
 *
 * Run with:  npm test   (or `node --test`)
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const HTML = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const SCRIPT = HTML.match(/<script>([\s\S]*?)<\/script>/)[1];

const round = (n, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;

// ─── Fake DOM ──────────────────────────────────────────────────────────────

/** A DOM element stub with just enough surface area for index.html's script. */
function makeEl(id) {
  return {
    id,
    value: '',
    textContent: '',
    innerHTML: '',
    style: { display: '', width: '' },
    classList: {
      _set: new Set(),
      add(c) { this._set.add(c); },
      remove(c) { this._set.delete(c); },
      toggle(c) { this._set.has(c) ? this._set.delete(c) : this._set.add(c); },
      contains(c) { return this._set.has(c); },
    },
    childNodes: [{ textContent: '' }],
    querySelector() { return null; },
    querySelectorAll() { return []; },
    addEventListener() { /* no-op: we drive functions directly */ },
    appendChild() {},
    offsetWidth: 0,
  };
}

const elements = new Map();

const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeEl(id));
    return elements.get(id);
  },
  querySelector() { return makeEl('__qs__'); },
  querySelectorAll() { return []; },
  createElement() { return makeEl('__created__'); },
  head: { appendChild() {} },
};

// localStorage stub (persistCurrentState writes to it)
const localStorage = {
  _store: {},
  getItem(k) { return this._store[k] ?? null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
};

// ─── Boot the real index.html script in a sandboxed scope ──────────────────

/**
 * We wrap the extracted script so we can (a) inject our fake globals and
 * (b) return the symbols the tests need. `with (scope)` lets the script's
 * bareword references to document/localStorage/etc. resolve to our fakes.
 */
const boot = new Function(`
  with (this) {
    ${SCRIPT}
    // expose internals to the test harness
    return {
      calculate, calculateInvestment, loanType, FREQ_LABELS,
      inputs, res, applyLoanType, fmtCurr,
      setLoanType: t => { loanType.current = t; },
      set: (key, val) => { if (inputs[key]) inputs[key].value = val; },
      el: id => this.document.getElementById(id),
    };
  }
`);

// window stub: the script attaches a storage listener, reads hostname, and
// calls matchMedia — none of which matter for the calc math.
const window = {
  addEventListener() {},
  location: { hostname: 'localhost' },
  matchMedia() { return { matches: false, addEventListener() {} }; },
};

const app = boot.call({ document, localStorage, window, console, Date, Math });

// Helper to read a numeric result element value back.
const text = id => app.el(id).textContent;
const num = id => {
  // strips $ and , and % from formatted outputs
  const raw = text(id).replace(/[$,%]/g, '');
  const v = parseFloat(raw);
  return Number.isFinite(v) ? v : NaN;
};

/** Configure a loan calculation by setting inputs then running calculate(). */
function runLoan({ amount, down, rate, term, frequency = 12, pmi, tax, insurance }) {
  app.setLoanType('mortgage');
  app.set('amount', amount);
  if (down !== undefined) app.set('down', down);
  app.set('rate', rate);
  app.set('term', term);
  app.set('frequency', frequency);
  if (pmi !== undefined) app.set('pmi', pmi);
  if (tax !== undefined) app.set('tax', tax);
  if (insurance !== undefined) app.set('insurance', insurance);
  app.calculate();
  return app;
}

// ─── Tests ─────────────────────────────────────────────────────────────────

test('script extracted from index.html without error and exposes calculate()', () => {
  assert.equal(typeof app.calculate, 'function');
  assert.equal(typeof app.calculateInvestment, 'function');
  assert.equal(app.loanType.current, 'mortgage');
});

test('mortgage: $250k @ 6.5% / 30y monthly writes ~$1,580/mo to the DOM', () => {
  runLoan({ amount: 250000, down: 0, rate: 6.5, term: 30, frequency: 12 });
  // fmtCurr drops cents, so the rendered string is '$1,580'
  assert.equal(text('res-monthly'), '$1,580');
  // fmtCurr also rounds interest/cost to whole dollars — compare at 0dp.
  assert.equal(round(num('res-interest'), 0), 318861);
  assert.equal(round(num('res-total-cost'), 0), 568861);
  assert.equal(round(num('res-principal'), 0), 250000);
});

test('auto loan: $30k @ 7.5% / 5y monthly renders $601/mo', () => {
  app.setLoanType('auto');
  app.set('amount', 30000);
  app.set('rate', 7.5);
  app.set('term', 5);
  app.set('frequency', 12);
  app.calculate();
  assert.equal(text('res-monthly'), '$601');
  assert.equal(round(num('res-interest'), 0), 6068);
});

test('personal loan: $15k @ 11% / 5y monthly renders $326/mo', () => {
  app.setLoanType('personal');
  app.set('amount', 15000);
  app.set('rate', 11);
  app.set('term', 5);
  app.set('frequency', 12);
  app.calculate();
  assert.equal(text('res-monthly'), '$326');
});

test('student loan: $40k @ 5.5% / 10y monthly renders $434/mo', () => {
  app.setLoanType('student');
  app.set('amount', 40000);
  app.set('rate', 5.5);
  app.set('term', 10);
  app.set('frequency', 12);
  app.calculate();
  assert.equal(text('res-monthly'), '$434');
});

test('PMI total-monthly line shows when down payment < 20%', () => {
  runLoan({ amount: 250000, down: 25000, rate: 6.5, term: 30, frequency: 12, pmi: 0.5, tax: 3000, insurance: 1200 });
  // With extras > 0 the script un-hides res-total-item and writes a value.
  assert.equal(app.el('res-total-item').style.display, '');
  assert.ok(text('res-total-monthly').startsWith('$'));
});

test('PMI total-monthly line hidden when down payment >= 20%', () => {
  runLoan({ amount: 250000, down: 50000, rate: 6.5, term: 30, frequency: 12, pmi: 0.5, tax: 0, insurance: 0 });
  // No extras -> the total-item is hidden (display: 'none').
  assert.equal(app.el('res-total-item').style.display, 'none');
});

test('zero-interest loan renders principal / n per period', () => {
  app.setLoanType('auto');
  app.set('amount', 12000);
  app.set('rate', 0.0001); // script rejects exactly 0; use ~0
  app.set('term', 1);
  app.set('frequency', 12);
  app.calculate();
  // ~$1000/mo for a 12-month interest-free $12k loan
  assert.ok(num('res-monthly') > 990 && num('res-monthly') < 1010);
});

test('bi-weekly payment yields lower total interest than monthly', () => {
  runLoan({ amount: 250000, down: 0, rate: 6.5, term: 30, frequency: 12 });
  const monthlyInterest = num('res-interest');
  runLoan({ amount: 250000, down: 0, rate: 6.5, term: 30, frequency: 26 });
  assert.ok(num('res-interest') < monthlyInterest);
});

test('investment compound interest: $10k @ 7% / 10y annual', () => {
  app.setLoanType('investment');
  app.set('investAmount', 10000);
  app.set('investYears', 10);
  app.set('annualReturn', 7);
  app.calculateInvestment();
  // 10000 * 1.07^10 = 19671.51 -> fmtCurr -> '$19,672'
  assert.equal(text('res-invest-final-annual'), '$19,672');
});

test('investment: monthly compounding beats annual', () => {
  app.setLoanType('investment');
  app.set('investAmount', 10000);
  app.set('investYears', 10);
  app.set('annualReturn', 7);
  app.calculateInvestment();
  assert.ok(num('res-invest-final-monthly') > num('res-invest-final-annual'));
  // frequency ordering: weekly > fortnightly > monthly > annual
  assert.ok(
    num('res-invest-final-annual') < num('res-invest-final-monthly') &&
    num('res-invest-final-monthly') < num('res-invest-final-fortnightly') &&
    num('res-invest-final-fortnightly') < num('res-invest-final-weekly'),
  );
});

test('FREQ_LABELS constant matches the documented frequencies', () => {
  assert.deepEqual(app.FREQ_LABELS, { 12: 'Monthly', 26: 'Bi-weekly', 52: 'Weekly' });
});

test('fmtCurr matches the in-script formatter ($ prefix, no cents)', () => {
  assert.equal(app.fmtCurr(250000), '$250,000');
  assert.equal(app.fmtCurr(1580.17), '$1,580');
  assert.equal(app.fmtCurr(0), '$0');
});
