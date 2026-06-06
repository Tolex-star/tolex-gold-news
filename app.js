async function loadNews() {

    try {

        const response = await fetch(
            `https://financialmodelingprep.com/api/v3/economic_calendar?from=2026-06-01&to=2026-12-31&apikey=${API_KEY}`
        );

        const data = await response.json();

        if (!data || data.length === 0) {
            document.getElementById("eventName").innerHTML =
                "No News Found";
            return;
        }

        const now = new Date();

        const upcoming = data.find(item => {
            return new Date(item.date) > now;
        });

        if (!upcoming) {
            document.getElementById("eventName").innerHTML =
                "No Upcoming News";
            return;
        }

        document.getElementById("eventName").innerHTML =
            upcoming.event || "Economic News";

        document.getElementById("eventTime").innerHTML =
            upcoming.date;

        document.getElementById("impact").innerHTML =
            "Impact: " + (upcoming.impact || "Unknown");

        document.getElementById("bias").innerHTML =
            "Currency: " + (upcoming.country || "");

        const newsHtml = data
            .slice(0, 10)
            .map(item =>
                `<div class="news-item">
                    ${item.date} - ${item.event}
                </div>`
            )
            .join("");

        document.getElementById("newsList").innerHTML =
            newsHtml;

    } catch (err) {

        document.getElementById("eventName").innerHTML =
            "API Error";

        console.error(err);
    }
}

loadNews();

setInterval(loadNews, 60000);
