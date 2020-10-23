// ==UserScript==
// 去除重定向代码来自https://greasyfork.org/scripts/377281-去除重定向
// ==/UserScript==
let insertLocked = true;
let currentSite;
const DBSite = {
    baidu: {
        key: "baidu",
        sourceNodeReg: "#content_left .c-container .t a, #content_left .c-container .f13 a.c-showurl, #content_left .c-container .c-row a[target='_blank']",
        responseDealReg: /window.location.replace\("(.+)"\)/
    }
};

(function () {
    'use strict';
    initSetting();

    document.addEventListener('DOMNodeInserted', function () {
        if (!insertLocked) {
            insertLocked = true;
            if (currentSite) {
                repeatDeal();
            }
        }
    }, false);
})();

function fetchCurrentSite() {
    let host = window.location.host;
   if (host.indexOf("baidu") > -1) {
        currentSite = DBSite.baidu;
    }
}

function repeatDeal() {
    setTimeout(function () {
        antiRedirect(currentSite);
    },20);
}

function initSetting() {
    checkJquery();
}

function checkJquery() {
    if (!window.jQuery) {
        let jqueryScript = document.createElement("script");
        jqueryScript.type = "text/javascript";
        jqueryScript.src = "https://code.jquery.com/jquery-3.3.1.min.js";
        jqueryScript.onload = function () {
            initAxios();
        };
        document.head.appendChild(jqueryScript);
    } else {
        initAxios();
    }
}

function initAxios() {
    let axiosScript = document.createElement("script");
    axiosScript.src = "https://unpkg.com/axios@0.18.0/dist/axios.min.js";
    axiosScript.type = "text/javascript";
    axiosScript.onload = function () {
        fetchCurrentSite();
        if (currentSite) {
            antiRedirect(currentSite);
        }
    };
    document.head.appendChild(axiosScript);
}

function antiRedirect(webSite) {
    switch (webSite.key) {
        case "baidu":
            $(webSite.sourceNodeReg).each(function () {
                fetchRealUrlByAjax($(this), webSite.responseDealReg);
            });
            break;
        default:
    }
    insertLocked = false;
}

function fetchRealUrlByAxios(sourceObj, reg) {
    let url = sourceObj.attr("href").replace(/^http:/, "https:");
    axios.get(url)
        .then(function (response) {
            let data = response.data;
            let matches = data.match(reg);
            if (matches && matches.length === 2) {
                sourceObj.attr("href", matches[1]);
            }
            sourceObj.attr("target", "_blank");
        })
        .catch(function (error) {
            console.log("去除重定向失败！", error);
        });
}

function fetchRealUrlByAjax(sourceObj, reg) {
    let url = sourceObj.attr("href").replace(/^http:/, "https:");
    if (!url.startsWith("https://www.baidu.com/link?url=")) {
        return;
    }
    if (currentSite.key === "baidu") {
        url = url + "&wd=&eqid=";
    }
    $.ajax({
        url: url,
        dataType: "text",
        headers: {
            "Accept": "*/*"
        },
        success: function (response) {
            let matches = response.match(reg);
            if (matches && matches.length === 2) {
                sourceObj.attr("href", matches[1]);
            }
        }
    });
}

