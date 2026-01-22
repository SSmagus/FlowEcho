document.getElementById("send").onclick = () => {
    chrome.runtime.sendMessage({
        type: "FLOWECHO_EVENT",
        payload: {
            source: "popup",
            timestamp: Date.now(),
            event: "USER_TRIGGER"
        }
    });
};
