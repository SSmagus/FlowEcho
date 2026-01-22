
function emitSampleEvent() {
    const eventPayload = {
        source: "content-script",
        url: window.location.href,
        timestamp: Date.now(),
        event: "PAGE_VISIT"
    };

    chrome.runtime.sendMessage({
        type: "FLOWECHO_EVENT",
        payload: eventPayload
    });
}

emitSampleEvent();
