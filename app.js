async function loadNews() {

    try {

        const newsData = [

            {
                event: "US CPI",
                date: "2026-06-12T20:30:00",
                impact: "HIGH IMPACT",
                currency: "USD",
                confidence: "82%",
                volatility: "★★★★★ EXTREME"
            },

            {
                event: "FOMC Interest Rate Decision",
                date: "2026-06-18T01:00:00",
                impact: "HIGH IMPACT",
                currency: "USD",
                confidence: "95%",
                volatility: "★★★★★ EXTREME"
            },

            {
                event: "Non Farm Payrolls",
                date: "2026-07-03T20:30:00",
                impact: "HIGH IMPACT",
                currency: "USD",
                confidence: "85%",
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

        if (days > 0 || minutes > 60) {

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
            <h2 style="color:#00ff88">
            🟢 BUY GOLD
            </h2>

            <p>
            Confidence : ${upcoming.confidence}
            </p>

            <p>
            Expected Volatility :
            ${upcoming.volatility}
            </p>

            <hr>

            <p>
            CPI Actual < Forecast
            <br>
            🟢 STRONG BUY GOLD
            </p>

            <p>
            CPI Actual > Forecast
            <br>
            🔴 STRONG SELL GOLD
            </p>

            <p>
            CPI Actual ≈ Forecast
            <br>
            ⚪ NEUTRAL
            </p>
            `;
        }

        else if (upcoming.event.includes("Payroll")) {

            recommendation =
            `
            <h2 style="color:#ff5555">
            🔴 SELL GOLD
            </h2>

            <p>
            Confidence : ${upcoming.confidence}
            </p>

            <p>
            Expected Volatility :
            ${upcoming.volatility}
            </p>

            <hr>

            <p>
            NFP Actual > Forecast
            <br>
            🔴 STRONG SELL GOLD
            </p>

            <p>
            NFP Actual < Forecast
            <br>
            🟢 STRONG BUY GOLD
            </p>

            <p>
            NFP Actual ≈ Forecast
            <br>
            ⚪ NEUTRAL
            </p>
            `;
        }

        else if (upcoming.event.includes("FOMC")) {

            recommendation =
            `
            <h2 style="color:#ffaa00">
            ⚠ FOMC EVENT
            </h2>

            <p>
            Confidence : ${upcoming.confidence}
            </p>

            <p>
            Expected Volatility :
            ${upcoming.volatility}
            </p>

            <hr>

            <p>
            RATE CUT
            <br>
            🟢 STRONG BUY GOLD
            </p>

            <p>
            RATE HIKE
            <br>
            🔴 STRONG SELL GOLD
            </p>

            <p>
            NO CHANGE
            <br>
            ⚪ NEUTRAL
            </p>
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
            "🔴 HIGH IMPACT";

        document.getElementById("bias").innerHTML =
            "🇺🇸 USD NEWS";

        document.getElementById("goldBias").innerHTML =
            recommendation;

        const newsHtml =
            newsData.map(
                item =>
                `
                <div class="news-item">
                    <strong>${item.event}</strong>
                    <br>
                    ${item.date} WIB
                    <br>
                    ${item.volatility}
                </div>
                `
            ).join("");

        document.getElementById("newsList").innerHTML =
            newsHtml;

        document.getElementById("lastUpdate").innerHTML =
            new Date().toLocaleTimeString("id-ID");

    }

    catch (err) {

        console.log(err);

        document.getElementById("eventName").innerHTML =
            "SYSTEM ERROR";
    }
}

loadNews();

setInterval(loadNews, 1000);
