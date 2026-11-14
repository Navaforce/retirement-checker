# Retirement Check

Single-file HTML app (index.html). Monthly entry of investments + savings; projects the month interest-only income ($85k gross, inflation-adjusted) covers the target without touching principal.

## Model
- Required principal(t) = target x (1+inflation)^(t/12) / yield. Defaults: yield 4%, growth 6%, inflation 3%, contribution $0 flat.
- Timeline = first month projected balance >= required principal (60-year cap).

## Security
- No financial data in repo or HTML; data lives in browser localStorage only.
- AES-GCM data key, wrapped by PBKDF2 (600k) passphrase key and optionally a WebAuthn passkey PRF key (Face ID, iOS 18+, HTTPS).
- CSP: connect-src none (no network). Auto-lock after 60s hidden. Encrypted export/import for backup.
- GitHub Pages is public even for private repos (paid plans excepted); security rests on encryption, not hosting.

## Tests
Logic + vault round trip verified with happy-dom (docs/test-results). Face ID needs on-device test.
