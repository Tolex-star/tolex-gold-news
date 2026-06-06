async function loadNews() {

    document.getElementById("eventName").innerHTML =
        "Gold News Monitor Active";

    document.getElementById("eventTime").innerHTML =
        "Waiting economic news...";

    document.getElementById("countdown").innerHTML =
        "";

    document.getElementById("impact").innerHTML =
        "Impact: High";

    document.getElementById("bias").innerHTML =
        "Bias: Monitoring";

    document.getElementById("newsList").innerHTML =
        "<div class='news-item'>System connected to FMP API</div>";
}

loadNews();
