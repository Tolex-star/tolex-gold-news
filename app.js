async function loadNews() {

    try {

        const response = await fetch("news.json");
        const data = await response.json();

        if (!data || data.length === 0) {

            document.getElementById("eventName").innerHTML =
                "No News Found";

            return;
        }

        const nextNews = data[0];

        document.getElementById("eventName").innerHTML =
            nextNews.event;

        document.getElementById("eventTime").innerHTML =
            nextNews.date;

        document.getElementById("impact").innerHTML =
            "Impact: " + nextNews.impact;

        document.getElementById("bias").innerHTML =
            "Currency: " + nextNews.country;

        let html = "";

        data.forEach(item => {

            html += `
            <div class="news-item">
                ${item.date} - ${item.event}
            </div>
            `;

        });

        document.getElementById("newsList").innerHTML =
            html;

    }
    catch (err) {

        document.getElementById("eventName").innerHTML =
            "News Load Error";

        console.error(err);
    }
}

loadNews();
