# Retirement Check

Single-file HTML app (index.html). Monthly entry of investments + savings; projects the month interest-only income ($85k gross, inflation-adjusted) covers the target without touching principal.

## Model
- Required principal(t) = target x (1+inflation)^(t/12) / yield. Defaults: yield 4%, growth 7.24%, inflation 3%, no contribution input (user enters balances only). Projection compounds the balance at the assumed growth until 12 months are logged, then at the user's own observed annualized growth (trailing 12 months).
- $85k comes from the portfolio alone; pension, VA and Social Security are excluded by design.
- Timeline = first month projected balance >= required principal (60-year cap).

## Security
- No financial data in repo or HTML; data lives in browser localStorage only.
- AES-GCM data key, wrapped by PBKDF2 (600k) passphrase key and optionally a WebAuthn passkey PRF key (Face ID, iOS 18+, HTTPS).
- CSP: connect-src self (same-origin only; used by version refresh). Auto-lock after 60s hidden. Encrypted export/import for backup.
- GitHub Pages is public even for private repos (paid plans excepted); security rests on encryption, not hosting.

## Tests
Logic + vault round trip verified with happy-dom (docs/test-results). Face ID needs on-device test.

## Features (v1.5.0)
- Monthly entry of three required balances: E-Trade, Fidelity, Black Diamond (total = sum).
- Growth default 7.24% (user's lifetime rate, primary account); switches to observed growth after 12 months.
- Passphrase + Face ID unlock; Face ID enabled from Settings with no re-prompt; passphrase reset in Settings once unlocked.
- Version label + Refresh button in header (same-origin fetch; CSP connect-src 'self').
- Icon: tools/make_icon.py generates apple-touch-icon.png, icon-192.png, icon-512.png.
- Live: https://navaforce.github.io/retirement-checker/ (public repo; no data in repo).
