# FinCalc · Loan Calculator

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat-square)](.)
[![Single File](https://img.shields.io/badge/single%20file-index.html-blue?style=flat-square)](./index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**A beautiful, zero-dependency loan calculator that runs entirely in your browser.**  
Estimate monthly payments, total interest, and full amortization schedules — instantly.

[**→ Open Calculator**](./index.html) &nbsp;·&nbsp; [Features](#-features) &nbsp;·&nbsp; [Screenshots](#-screenshots) &nbsp;·&nbsp; [Usage](#-usage) &nbsp;·&nbsp; [How It Works](#-how-it-works)

</div>

---

## ✨ Overview

**FinCalc** is a polished, production-quality loan calculator built as a single self-contained `index.html` file. No frameworks, no build tools, no server — just open it in a browser and start calculating.

Whether you're shopping for a mortgage, pricing out a car loan, or planning a personal borrowing strategy, FinCalc gives you clear, real-time financial insights with a clean modern interface.

---

## 🚀 Features

### 💼 Four Loan Types
Each loan type comes pre-loaded with sensible defaults and shows only the fields that are relevant:

| Loan Type | Default Amount | Default Rate | Default Term | Extras |
|-----------|---------------|-------------|-------------|--------|
| 🏠 Mortgage | $250,000 | 6.50% | 30 years | Down payment, PMI, property tax, home insurance |
| 🚗 Auto Loan | $30,000 | 7.50% | 5 years | — |
| 💳 Personal Loan | $15,000 | 11.00% | 5 years | — |
| 🎓 Student Loan | $40,000 | 5.50% | 10 years | — |

### 🎛️ Smart Inputs
- **Loan Amount** — number input with a live drag slider (range: $1K–$1M)
- **Down Payment** — dynamic field shown for mortgage loans only, with slider
- **Loan Term** — free-form integer input (1–50 years) synced to a range slider; type any year count you need
- **Annual Interest Rate** — precise to 0.05% increments, with slider (0.5%–20%)
- **PMI Rate** — Private Mortgage Insurance, shown when down payment < 20%
- **Annual Property Tax** — added to monthly cost breakdown
- **Annual Home Insurance** — included in total monthly payment
- **Payment Frequency** — switch between Monthly, Bi-weekly, or Weekly payments

### 📊 Rich Results Panel
Every change recalculates instantly and displays:

- **Monthly / Periodic Payment** — principal & interest component
- **Total Monthly Cost** — full payment including tax, insurance & PMI (mortgage)
- **Total Principal** — the actual loan amount borrowed
- **Total Interest Paid** — full interest cost over the loan lifetime, as a % of principal
- **Total Cost** — everything you'll pay over the life of the loan
- **Payoff Date** — exact month and year when the loan is fully repaid

### 📉 Visual Cost Breakdown
An animated horizontal bar chart shows the split between principal repayment and interest cost — updated live as you adjust any input.

### 📅 Amortization Schedule
Toggle a full amortization table showing:
- **Yearly summaries** for loans longer than 2 years
- **Period-by-period breakdown** for shorter loans
- Columns: Period · Payment · Principal · Interest · Remaining Balance

### 🎨 Modern UI
- Clean **light theme** with subtle blue accent colors
- Soft radial background gradients for depth without distraction
- **DM Serif Display** for headings, **DM Sans** for body, **DM Mono** for numbers
- Smooth entrance animations (fade-down / fade-up)
- Pulse animation on result values when recalculating
- Fully **responsive** — works great on mobile and tablet

---

## 📸 Screenshots

```
┌─────────────────────────────────────────────────────────────────────┐
│                      · FinCalc ·                                    │
│                   Loan Calculator                                    │
│         Estimate your monthly payments and total cost               │
│                                                                      │
│    [ Mortgage ]  [ Auto Loan ]  [ Personal Loan ]  [ Student Loan ] │
│                                                                      │
│  ┌──────────────────────┐  ┌──────────────────────┐                 │
│  │  LOAN DETAILS        │  │  RATE & FEES         │                 │
│  │                      │  │                      │                 │
│  │  Loan Amount $250K   │  │  Interest Rate 6.50% │                 │
│  │  ████████████░░░░░░  │  │  ██████░░░░░░░░░░░░  │                 │
│  │                      │  │                      │                 │
│  │  Down Payment $50K   │  │  PMI Rate     0.50%  │                 │
│  │  ████░░░░░░░░░░░░░░  │  │  ██░░░░░░░░░░░░░░░░  │                 │
│  │                      │  │                      │                 │
│  │  Term        30 yrs  │  │  Property Tax $3,000 │                 │
│  │  ██████████████████  │  │                      │                 │
│  │                      │  │  Home Ins.    $1,200 │                 │
│  │  Frequency  Monthly  │  │                      │                 │
│  │                      │  │  [ Calculate ]       │                 │
│  └──────────────────────┘  └──────────────────────┘                 │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │  YOUR RESULTS                                               │    │
│  │                                                             │    │
│  │  $1,580/mo   $1,830/mo   $200,000   $168,974   $368,974    │    │
│  │  P&I         Total       Principal  Interest   Total Cost  │    │
│  │                                                             │    │
│  │  Cost Breakdown ─────────────────── 54.3% · 45.7%          │    │
│  │  ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │    │
│  │  ● Principal   ● Interest                                   │    │
│  │                                                             │    │
│  │  [ 📅 View Amortization Schedule ∨ ]                        │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Usage

### Just open it

```bash
# Clone or download the repo
git clone https://github.com/yourname/fincalc.git

# Open in your browser — no server needed
open index.html
# or double-click the file in your file explorer
```

### Host it anywhere

Because it's a single HTML file with no external dependencies (fonts load from Google Fonts CDN), you can host it on:

- **GitHub Pages** — push to a repo, enable Pages, done
- **Netlify / Vercel** — drag and drop the file
- **Any static host** — S3, Cloudflare Pages, Firebase Hosting, etc.
- **Locally** — just open the file directly in a browser

---

## 🧮 How It Works

### Amortization Formula

FinCalc uses the standard loan amortization formula to compute each periodic payment:

```
         P · r · (1 + r)ⁿ
M  =  ─────────────────────
          (1 + r)ⁿ − 1
```

| Variable | Meaning |
|----------|---------|
| `M` | Payment per period |
| `P` | Principal (loan amount minus down payment) |
| `r` | Periodic interest rate = Annual Rate ÷ Payments per year |
| `n` | Total number of payment periods = Years × Payments per year |

### Bi-weekly & Weekly Payments

For bi-weekly (26 payments/year) and weekly (52 payments/year) frequencies, the formula is applied with the corresponding `r` and `n` values. This means bi-weekly payments can meaningfully reduce total interest paid and shorten the loan term compared to monthly.

### PMI Logic

Private Mortgage Insurance is automatically included in the total monthly cost when the down payment is **less than 20%** of the purchase price. It disappears from the calculation once you meet or exceed the 20% threshold.

### Amortization Table Generation

Each period's split is computed iteratively:

```
Interest portion  = Remaining Balance × r
Principal portion = Payment − Interest portion
New Balance       = Previous Balance − Principal portion
```

For loans longer than 24 periods, the table is grouped into **annual summaries** to keep the display readable.

---

## 📁 Project Structure

```
fincalc/
└── index.html          # The entire application — HTML + CSS + JS
└── README.md           # This file
```

That's it. The whole calculator — layout, styles, logic, and interactivity — lives in one file under ~850 lines.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#f4f6f9` | Page background |
| `--surface` | `#ffffff` | Card backgrounds |
| `--surface2` | `#f0f2f6` | Input fields, result tiles |
| `--border` | `#dde1ea` | Card and input borders |
| `--accent` | `#2a6ef5` | Primary blue — tabs, sliders, focus rings |
| `--accent2` | `#0fa878` | Green — principal / positive values |
| `--accent3` | `#9b5de5` | Purple — total cost |
| `--danger` | `#e0413a` | Red — interest cost |
| `--text` | `#1a1d26` | Body text |
| `--muted` | `#7a8099` | Labels, subtitles, secondary text |

**Typography:**
- **DM Serif Display** — headings and result values (elegant, editorial feel)
- **DM Sans** — UI labels, buttons, body text (clean and modern)
- **DM Mono** — all numbers, sliders, monospace data (readable financial figures)

---

## ⚙️ Customization

Since it's plain HTML/CSS/JS, customization is straightforward:

### Change default values
Edit the `applyLoanType()` function in the `<script>` block to adjust pre-filled amounts, rates, and terms for each loan type.

### Change the color theme
Update the CSS variables in `:root` — every color in the UI references these tokens, so changing one line affects the whole app.

### Add a new loan type
1. Add a new `<button class="tab" data-type="yourtype">` in the tabs section
2. Add a corresponding `else if (type === 'yourtype')` block in `applyLoanType()`
3. Add any new fields in the HTML and wire them up in the `inputs` object

### Localize currency
Replace `'en-AU'` in the `fmtCurr` formatter with your preferred locale, and update the `$` prefix symbol to your currency symbol:

```js
// Change this:
const fmtCurr = n => '$' + n.toLocaleString('en-AU', { ... });

// To e.g. Euro:
const fmtCurr = n => '€' + n.toLocaleString('de-DE', { ... });
```

---

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome / Edge 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Mobile Chrome / Safari | ✅ Responsive |

---

## 📄 License

MIT License — free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

---

## 🙏 Credits

- Fonts by [Google Fonts](https://fonts.google.com/) — DM Serif Display, DM Sans, DM Mono
- Built with zero runtime dependencies

---

<div align="center">

Made with care · **FinCalc** · [Open the Calculator](./index.html)

</div>
