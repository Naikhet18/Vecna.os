{
    "manifest_version": 3,
    "name": "Vecna: Dark Mode Pro",
    "version": "3.0",
    "permissions": [
        "activeTab",
        "scripting",
        "storage"
    ],
    "host_permissions": [
        "<all_urls>"
    ],
    "action": {
        "default_popup": "popup.html"
    },
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["content.js"],
            "css": ["style.css"],
            "run_at": "document_end"
        }
    ]
}
