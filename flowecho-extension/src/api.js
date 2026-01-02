const API_BASE_URL = "http://localhost:8080/api/events";

export async function sendEventToBackend(eventData) {
    try {
        const res = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData)
        });
        return await res.json();
    } catch (err) {
        console.error("Backend API error:", err);
        throw err;
    }
}
