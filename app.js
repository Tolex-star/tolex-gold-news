async function loadNews() {

    try {

        const newsData = [

            {
                event: "US CPI",
                date: "2026-06-12T20:30:00",
                impact: "High",
                currency: "USD",
                volatility: "★★★★★ EXTREME"
            },

            {
                event: "FOMC Interest Rate Decision",
                date: "2026-06-18T01:00:00",
                impact: "High",
                currency: "USD",
                volatility: "★★★★★ EXTREME"
            },

            {
                event: "Non Farm Payrolls",
                date: "2026-07-03T20:30:00",
                impact: "High",
                currency: "USD",
                volatility: "★★★★★ EXTREME"
            }

        ];

        const now = new Date();

        const upcoming =
            newsData.find(
                item => new Date(item.date) > now
            );

        if (!upcoming) {

            document.getElementById("eventName").innerHTML =
                "NO UPCOMING NEWS";

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
            Math.floor((diff % 86400000) / 3600000);

        const minutes =
            Math.floor((diff % 3600000) / 60000);

        const seconds =
            Math.floor((diff % 60000) / 1000);

        let statusText = "";
        let statusColor = "";

        if (minutes > 60 || days > 0) {

            statusText = "🟢 SAFE TO TRADE";
            statusColor = "#008f11";

        } else if (minutes > 30) {

            statusText = "🟡 CAUTION";
            statusColor = "#d4a000";

        } else if (minutes > 5) {

            statusText = "🔴 AVOID ENTRY";
            statusColor = "#c00000";

        } else {

            statusText = "🚨 NEWS IMMINENT";
            statusColor = "#ff0000";
        }

        document.getElementById("tradeStatus").innerHTML =
            statusText;

        document.getElementById("tradeStatus").style.background =
            statusColor;

        let recommendation = "";

        if (upcoming.event.includes("CPI")) {

            recommendation =
            `
            <h3 style="color:#00ff88">
            🟢 BUY XAUUSD
            </h3>

            <p>
            Jika CPI lebih rendah dari forecast.
            </p>

            <p>
            Jika CPI lebih tinggi dari forecast
            → 🔴 STRONG SELL XAUUSD
            </p>

            <h4 style="color:gold">
            Volatility : ★★★★★ EXTREME
            </h4>
            `;
        }

        else if (upcoming.event.includes("Payroll")) {

            recommendation =
            `
            <h3 style="color:#ff5555">
            🔴 SELL XAUUSD
            </h3>

            <p>
            Jika NFP lebih tinggi dari forecast.
            </p>

            <p>
            Jika NFP lebih rendah dari forecast
            → 🟢 STRONG BUY XAUUSD
            </p>

            <h4 style="color:gold">
            Volatility : ★★★★★ EXTREME
            </h4>
            `;
        }

        else if (upcoming.event.includes("FOMC")) {

            recommendation =
            `
            <h3 style="color:#ffaa00">
            ⚠ WAIT FOMC
            </h3>

            <p>
            Rate Hike
            → 🔴 SUPER SELL GOLD
            </p>

            <p>
            Rate Cut
            → 🟢 SUPER BUY GOLD
            </p>

            <h4 style="color:gold">
            Volatility : ★★★★★ EXTREME
            </h4>
            `;
        }

        document.getElementById("eventName").innerHTML =
            upcoming.event;

        document.getElementById("eventTime").innerHTML =
            newsTime.toLocaleString("id-ID")
            + " WIB";

        document.getElementById("countdown").innerHTML =
            `⏰ ${days}D ${hours}H ${minutes}M ${seconds}S`;

        document.getElementById("impact").innerHTML =
            "Impact : " + upcoming.impact;

        document.getElementById("bias").innerHTML =
            "Currency : " + upcoming.currency;

        document.getElementById("goldBias").innerHTML =
            recommendation;

        const newsHtml =
            newsData.map(
                item =>
                `
                <div class="news-item">
                    ${item.date} WIB
                    -
                    ${item.event}
                </div>
                `
            ).join("");

        document.getElementById("newsList").innerHTML =
            newsHtml;

    }

    catch (err) {

        console.log(err);

        document.getElementById("eventName").innerHTML =
            "ERROR";
    }
}

loadNews();

setInterval(loadNews, 1000);
