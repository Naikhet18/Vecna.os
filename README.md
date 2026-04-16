```markdown
# VECNA.OS // Endpoint C2 Agent
**Post-Encryption Credential Hijacking & Session Exfiltration Framework**

> "Users demand aesthetics. We demand plaintext."

![Version](https://img.shields.io/badge/Version-3.0%20(M2%20Optimized)-00ffcc?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-V3-ff003c?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-PoC_Active-b026ff?style=for-the-badge)

```text
 \ \    / /___  __  _ _   __ _ 
  \ \/\/ // -_)/ _|  ' \ / _` |
   \_/\_/ \___|\__||_||_|\__,_|
      C 2   E N D P O I N T
```

---

## CLASSIFIED: AUTHORIZED USE ONLY
Vecna.OS is a Proof-of-Concept (PoC) developed strictly for academic VAPT (Vulnerability Assessment and Penetration Testing) demonstrations. This tool simulates a Malicious Supply Chain / Trojanized Extension attack to demonstrate the critical vulnerabilities inherent in the Browser Trust Model. 

Do not deploy this in unauthorized environments.

---

## The Concept: The Trust Gap
Traditional network security focuses on hardening the backend server and encrypting data in transit (HTTPS/SSL). Vecna.OS renders these defenses obsolete. Disguised as a premium "Dark Mode" UI utility, Vecna operates inside the client's execution context. It intercepts data directly from the Document Object Model (DOM) the millisecond the user interacts with it—before the browser's encryption protocols even initialize.

If the endpoint is compromised, the network perimeter is an illusion.

---

## Core Capabilities

| Feature | Threat Description |
| :--- | :--- |
| **DOM-Layer Harvesting** | Pre-emptive interception via `focusout` and `MutationObserver` events. Captures plaintext credentials passively, bypassing the noise of traditional keyloggers. |
| **MFA/2FA Bypass** | Actively scrapes `document.cookie` during the interaction sequence, allowing an operator to hijack live session tokens and bypass multi-factor authentication. |
| **Target Fingerprinting** | Automatically profiles the victim's hardware (`navigator.platform`, display metrics) to map the system architecture for targeted secondary payloads. |
| **Zero-Noise Persistence** | Commits stolen intelligence instantly to `chrome.storage.local`. Survives AJAX redirects, page refreshes, and network drops without triggering firewall alerts via outbound API requests. |
| **Kill Switch UI** | Features a functional, glassmorphism-styled popup interface. The C2 harvesting logic is physically wired to the "Dark Mode" toggle for maximum deception. |

---

## Architecture & Tech Stack
Vecna.OS is built to run natively and seamlessly, optimized for modern architectures including Apple Silicon M-Series.

* **Core Engine:** Manifest V3 (Google Chrome's strict security standard).
* **Payload Execution:** Vanilla JavaScript (Zero external dependencies).
* **Deception UI:** Pure CSS3 Glassmorphism (`backdrop-filter`), CSS Keyframe Animations.

---

## Deployment Instructions (Local Execution)

Because Vecna.OS violates Web Store malware policies, it must be deployed as an "Unpacked Extension" directly from the source.

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/yourusername/Vecna-OS-PoC.git](https://github.com/yourusername/Vecna-OS-PoC.git)
   ```
2. Open Chromium/Google Chrome and navigate to `chrome://extensions/`.
3. Toggle **Developer mode** ON (top right corner).
4. Click **Load unpacked** and select the `Vecna-OS-PoC` directory.
5. Pin the extension to your toolbar.
6. Open any target website with an authentication portal, toggle the "Dark Mode" switch to ARMED, and observe the DOM compromise via the Extension Popup Vault.

---

## Defensive Mitigations
As Security Researchers, the objective of exploitation is remediation. Vecna.OS can be mitigated through:

1. **Zero-Trust Extension Policies:** Corporate MDMs must enforce strict allow-lists for browser extensions via Group Policy. Default-deny all third-party add-ons.
2. **Hardware Authentication:** Transitioning from static passwords to FIDO2/WebAuthn hardware keys (YubiKey, Biometrics). Removing the password from the DOM neutralizes DOM-scraping credential theft.
3. **Content Security Policy (CSP):** Implementing strict `connect-src` and `script-src` headers to limit unauthorized execution, though highly privileged extensions often bypass basic page-level CSP.

---
*Developed by Het Naik for VAPT Internship @jemistry info solutions LLP | 2026*
```
