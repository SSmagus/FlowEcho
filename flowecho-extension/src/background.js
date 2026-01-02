import { sendEventToBackend } from "./api.js";

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    if (msg.type === "FLOWECHO_EVENT") {
        try {
            const result = await sendEventToBackend(msg.payload);
            sendResponse({ ok: true, result });
        } catch (e) {
            sendResponse({ ok: false, error: e.message });
        }
    }
    return true;
});
