# Retirement Check

Single-file HTML app (index.html). Monthly entry of investments + savings; projects the month interest-only income ($85k gross, inflation-adjusted) covers the target without touching principal.

## Model (v1.7.0)
- Per-account growth and income yield (Settings). Defaults: E-Trade CRM 7% / 0.6% (verify dividend), Fidelity 401k 7% / 4% (locked until 2036-02), Black Diamond 7% / 4%.
- Income(t) = sum(balance_i(t) x yield_i), counting locked accounts only after the unlock month. Target(t) = $85k gross x (1+3% inflation)^(t/12). Date = first month income >= target (60-year cap).
- Early/late = growth +/- 2 points on all accounts. Also shows the date if locked accounts were accessible, and after-tax target (15% default).
- Observed growth per account replaces the assumption after 12 months: median monthly return over the trailing 12 months, annualized, so one-off deposits (RSU vests) don't distort it.
- No contribution input (balances only).
- $85k comes from the portfolio alone; pension, VA and Social Security are excluded by design.

## Security
- No financial data in repo or HTML; data lives in browser localStorage only.
- AES-GCM data key, wrapped by PBKDF2 (600k) passphrase key and optionally a WebAuthn passkey PRF key (Face ID, iOS 18+, HTTPS).
- CSP: connect-src self (same-origin only; used by version refresh). Auto-lock after 60s hidden. Encrypted export/import for backup.
- GitHub Pages is public even for private repos (paid plans excepted); security rests on encryption, not hosting.

## Tests
Logic + vault round trip verified with happy-dom (docs/test-results). Face ID needs on-device test.

## Features
- Monthly entry of three required balances: E-Trade, Fidelity, Black Diamond (total = sum).
- Passphrase + Face ID unlock; Face ID enabled from Settings with no re-prompt; passphrase reset in Settings once unlocked.
- Version label + Refresh button in header (same-origin fetch; CSP connect-src 'self').
- Icon: tools/make_icon.py generates apple-touch-icon.png, icon-192.png, icon-512.png.
- Live: https://navaforce.github.io/retirement-checker/ (public repo; no data in repo).
