async function loadNews() {

    try {

        const newsData = [

            {
                event: "US CPI",
                date: "2026-06-12T20:30:00",
                impact: "High",
                currency: "USD"
            },

            {
                event: "FOMC Interest Rate Decision",
                date: "2026-06-18T01:00:00",
                impact: "High",
                currency: "USD"
            },

            {
                event: "Non Farm Payrolls",
                date: "2026-07-03T20:30:00",
                impact: "High",
                currency: "USD"
            }

        ];

        const now = new Date();

        const upcoming =
            newsData.find(
                item =>
                new Date(item.date) > now
            );

        if (!upcoming) {

            document.getElementById("eventName")
                .innerHTML =
                "No Upcoming News";

            return;
        }

        const newsTime =
            new Date(upcoming.date);

        const diff =
            newsTime.getTime()
            -
            now.getTime();

        const days =
            Math.floor(diff / 86400000);

        const hours =
            Math.floor(
                (diff % 86400000)
                /
                3600000
            );

        const minutes =
            Math.floor(
                (diff % 3600000)
                /
                60000
            );

        let recommendation =
            "WAIT NEWS";

        if (
            upcoming.event.includes("CPI")
        ) {

            recommendation =
                `
                <div style="color:#00ff88;font-size:22px;font-weight:bold;">
                BUY XAUUSD
                </div>

                <br>

                Jika CPI lebih rendah dari forecast.

                <br><br>

                Jika CPI lebih tinggi dari forecast
                → SELL XAUUSD
                `;
        }

        else if (
            upcoming.event.includes("Payroll")
        ) {

            recommendation =
                `
                <div style="color:#ff5555;font-size:22px;font-weight:bold;">
                SELL XAUUSD
                </div>

                <br>

                Jika NFP lebih tinggi dari forecast.

                <br><br>

                Jika NFP lebih rendah dari forecast
                → BUY XAUUSD
                `;
        }

        else if (
            upcoming.event.includes("FOMC")
        ) {

            recommendation =
                `
                <div style="color:#ffaa00;font-size:22px;font-weight:bold;">
                WAIT FOMC
                </div>

                <br>

                Rate Hike
                → SELL XAUUSD

                <br><br>

                Rate Cut
                → BUY XAUUSD
                `;
        }

        document.getElementById("eventName")
            .innerHTML =
            upcoming.event;

        document.getElementById("eventTime")
            .innerHTML =
            upcoming.date
            +
            " WIB";

        document.getElementById("countdown")
            .innerHTML =
            `⏰ ${days}D ${hours}H ${minutes}M`;

        document.getElementById("impact")
            .innerHTML =
            "Impact: "
            +
            upcoming.impact;

        document.getElementById("bias")
            .innerHTML =
            "Currency: "
            +
            upcoming.currency;

        document.getElementById("goldBias")
            .innerHTML =
            recommendation;

        const newsHtml =
            newsData
            .map(
                item =>
                `
                <div class="news-item">
                ${item.date} WIB
                -
                ${item.event}
                </div>
                `
            )
            .join("");

        document.getElementById("newsList")
            .innerHTML =
            newsHtml;

    }

    catch (err) {

        console.log(err);

        document.getElementById("eventName")
            .innerHTML =
            "ERROR";
    }
}

loadNews();

setInterval(loadNews, 60000);
