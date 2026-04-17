# Security Policy & Reporting

If you discover a security issue in this repository or on https://hiohsec.com, please report it to alan@hiohsec.com with the subject line "Security issue: [short description]". Provide reproduction steps, affected URL or file paths, and any relevant logs or screenshots.

This repository contains the public website source. It does not store Controlled Unclassified Information (CUI). Do not store secrets, credentials, private keys, or sensitive configuration in this repo.

Basic security practices
- Use unique, strong passwords and enable MFA on all accounts that interact with this project (GitHub, hosting, DNS, Calendly, etc.).
- Do not commit secrets; if a secret is committed, rotate it immediately and remove it from history.
- Use branch protection and require reviews for merges to `main`.
- Keep dependencies and server software up to date.
- Limit access to deployment and hosting credentials to least-privilege users.

Reporting and response
- Send reports to: alan@hiohsec.com
- We aim to acknowledge reports within 48 hours and provide a remediation timeline.

Notes on site behavior
- Scheduling and invitee data are handled by Calendly; review Calendly account settings for storage, retention, and data-handling policies.
- This repo's Content-Security-Policy is intended to restrict script and style sources; server-level headers should be configured for HSTS and other response headers.

For questions about NIST SP 800-171 mapping or to request an evidence pack, contact the project owner.
