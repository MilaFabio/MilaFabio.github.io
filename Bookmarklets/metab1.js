function addJq() {
    function a() {
        c.innerHTML = k;
        f.appendChild(c);
        window.setTimeout(function() {
            "undefined" == typeof jQuery ? f.removeChild(c) : (jQuery(c).fadeOut("slow", function() {
                jQuery(this).remove();
            }), m && ($jq = jQuery.noConflict()));
        }, 2500);
    }
    var p = document.createElement("script"),
        c = document.createElement("div"),
        f = document.getElementsByTagName("body")[0],
        m = !1,
        q = tryCounter = 5,
        k = "";
    p.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js");
    c.style.position = "fixed";
    c.style.height = "32px";
    c.style.width = "220px";
    c.style.marginLeft = "-110px";
    c.style.top = "0";
    c.style.left = "50%";
    c.style.padding = "5px 10px 5px 10px";
    c.style.fontSize = "12px";
    c.style.color = "#222";
    c.style.backgroundColor = "#f99";
    c.style.zIndex = "999999";
    "undefined" != typeof jQuery ? k = "This page already using jQuery v" + jQuery.fn.jquery : ("function" == typeof $ && (m = !0), document.getElementsByTagName("head")[0].appendChild(p), k = "\u043d\u0435\u0442 ajax", a());
    var n = function() {
        setTimeout(function() {
            "undefined" == typeof jQuery ? tryCounter ? (tryCounter--, n()) : (k = "Sorry, but after " + q + " attempts, jQuery hasn't loaded", a()) : (k = "This page is now jQuerified with v" + jQuery.fn.jquery, m && (k += " and noConflict(). Use $jq(), not $()."), coolBM());
        }, 250);
    };
    n();
}
addJq();

function coolBM() {
    (function(a) {
        a(function() {
            function p() {
                function k(a) {
                    return a ? a.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;") : '<b class="red">\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c</b>';
                }

                function n(a) {
                    return a.split("<br>").join("<b class='red'>&lt;BR&gt;</b>").split("<br />").join("<b class='red'>&lt;BR&gt;</b>");
                }

                function f(a) {
                    var b = a.offsetWidth,
                        d = a.offsetHeight,
                        k = "tr" === a.nodeName.toLowerCase();
                    return 0 !== b || 0 !== d || k ? 0 < b && 0 < d && !k ? !1 : getRealDisplay(a) : !0;
                }

                function m(a) {
                    if (!a) {
                        return '<b class="red">\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c</b>';
                    }
                    var b = 0;
                    a = a.split("-").join("").split("\u2014").join("").split("|").join("");
                    a = a.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/\s+/g, " ");
                    for (pos = a.indexOf(" ", 0); - 1 != pos;) {
                        b++, pos = a.indexOf(" ", pos + 1);
                    }
                    return b + 1;
                }
                var l = document.getElementsByTagName("title"),
                    e = document.getElementsByTagName("meta"),
                    g = document.getElementsByTagName("h1"),
                    p = document.getElementsByTagName("b"),
                    q = document.getElementsByTagName("strong"),
                    r = document.getElementsByTagName("link");
                document.getElementsByTagName("noindex");
                document.body.getElementsByTagName("*");
                for (var d = "", t = "", b = 0; b < l.length; b++) {
                    var u = l[b].innerHTML,
                        v = m(u),
                        d = d + ("<b>Title</b> (" + v + "): " + u + "<br>");
                }
                for (b = 0; b < e.length; b++) {
                    e[b].getAttribute("name") && (nameMeta = e[b].getAttribute("name"), txtMeta = k(e[b].getAttribute("content")), "description" == e[b].getAttribute("name").toLowerCase() || "keywords" == e[b].getAttribute("name").toLowerCase() ? (lenMeta = m(txtMeta), d += "<b>" + nameMeta + "</b>(" + lenMeta + "): " + txtMeta + "<br>") : t += nameMeta + ": " + txtMeta + "<br>");
                }
                d += '<div class="coolCollapse">' + t + "</div>";
                for (b = 0; b < e.length; b++) {
                    e[b].getAttribute("name") && (nameMeta = e[b].getAttribute("name"), txtMeta = k(e[b].getAttribute("content")), "robots" == e[b].getAttribute("name").toLowerCase() || "yandex" == e[b].getAttribute("name").toLowerCase() || "googlebot" == e[b].getAttribute("name").toLowerCase()) && (lenMeta = m(txtMeta), d += "<b>meta " + nameMeta + "</b>(" + lenMeta + "): " + txtMeta + "<br>");
                }
                for (b = 0; b < r.length; b++) {
                    r[b].getAttribute("rel") && (txtRel = r[b].getAttribute("href"), "canonical" == r[b].getAttribute("rel").toLowerCase() && (txtRel != window.location && (txtRel = '<b class="red">' + txtRel + "</b>"), d += "<b>canonical:</b> " + txtRel + "<br>"));
                }
                d += "<b>strong count</b>: " + q.length + "<br>";
                d += "<b>b count</b>: " + p.length + "<br>";
                g[0] && (hh = n(g[0].innerHTML), d += '<b>H1</b>: <span class="hs">' + hh + "</span><br>");
                for (b = 1; b < g.length; b++) {
                    g[b] && (hh = n(g[b].innerHTML), d += '<b class="red">H1</b>: <span class="hs">' + hh + "</span><br>");
                }
                l = !1;
                for (e = 2; 6 >= e; e++) {
                    g = document.getElementsByTagName("h" + e);
                    g[0] && (hh = n(g[0].innerHTML), f(g[0]) && (hh = '<span class="coolHidAlert">' + hh + "</span>"), d += "<b>H" + e + "</b> (" + g.length + ' \u0448\u0442.): <span class="hs">' + hh, l = !0);
                    for (b = 1; b < g.length; b++) {
                        g[b] && (hh = n(g[b].innerHTML), f(g[b]) && (hh = '<span class="coolHidAlert">' + hh + "</span>"), d += " || " + hh);
                    }
                    l && (d += "</span><br>");
                    l = !1;
                }
                l = "http://" + top.location.host.toString();
                b = a("a[href^='" + l + "'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#'], a[href^='?']");
                coolInL = b.length;
                l = a("a:not([href^='" + l + "']):not(a[href^='/']):not(a[href^='./']):not(a[href^='../']):not(a[href^='#']):not(a[href^='?'])");
                coolExL = l.length;
                d += '<div><b class="psevdo showEx">Exetnal links (' + coolExL + ')</b> <b class="psevdo showIn">Internal Links (' + coolInL + ")</b></div>";
                d += "</div></div>";
                d += '<div class="coollinks"><ol class="coolLinksIn">';
                a.each(b, function(a, b) {
                    d += "<li>" + b + "</li>";
                });
                d += "</ol>";
                d += '<ol class="coolLinksEx">';
                a.each(l, function(a, b) {
                    d += "<li>" + b + "</li>";
                });
                d += "</ol>";
                d += "</div>";
                topBlock = '<div class="topBlockWrp"><div class="topBlock"><b class="close">\u00d7</b>' + d + "</div></div>";
                c();
                a("body").append(topBlock);
                h = a(".topBlockWrp").height();
                a("body").css({ "margin-top": h });
                a(".topBlock .showEx").click(function() {
                    a(".coollinks").hide();
                    a(".coolLinksIn").hide();
                    a(".coollinks").toggle();
                    a("body").addClass("coolRelative");
                    a("html, body").animate({ scrollTop: 0 }, "fast");
                    a(".coolLinksEx").toggle();
                });
                a(".topBlock .showIn").click(function() {
                    a(".coollinks").hide();
                    a(".coolLinksEx").hide();
                    a(".coollinks").toggle();
                    a("body").addClass("coolRelative");
                    a("html, body").animate({ scrollTop: 0 }, "fast");
                    a(".coolLinksIn").toggle();
                });
            }

            function c() {
                var a = document.createElement("style");
                a.setAttribute("type", "text/css");
                a.innerHTML = ".coolBlock .block-head {padding:4px 4px 4px 132px;line-height:normal;}.coolBlock .block-head SPAN {margin: 0 10px 0 0; padding: 5px;}.coolNumber {color:#555;font-size:14px;padding:0 5px 0 0;}.coolAbsolute {position:absolute !important;}.coolRelative {position:relative !important;}.coolBlock{position:fixed;width:100%;top:0;left:0;border-bottom:1px solid #9D9DA1;text-align:left;z-index:9999999;}.topBlockWrp{position:fixed;width:100%;top:0;left:0;background:#f8f8f8;z-index:999999;text-align:left;border-bottom:1px solid #9D9DA1;color:#000;font-family:arial;max-height:50%;overflow-y:auto;}.topBlockWrp .hs A, .topBlockWrp .hs STRONG, .topBlockWrp .hs B, .topBlockWrp .hs I, .topBlockWrp .hs DIV, .topBlockWrp .hs SPAN{display: inline;color:#000;border-bottom: 1px solid red !important;}.topBlockWrp IMG{border: 2px solid red;width: 100px;}.coolGray{background:#f0f0f0;box-shadow:0 -3px 5px #fff inset;}.coolBlock .close, .topBlockWrp .close {float:right;cursor:pointer;color:#000;font-size: 24px;line-height: 0;padding: 8px 0 0;}.coolBlockBody {width:60%;position:absolute;top:0;left:20%;background:#fff;z-index: 999;box-shadow:0 3px 10px #000;}.coolCollapse{display:none;}.coolBlockBody OL{margin:0 15px;padding:10px 0 10px 25px;list-style:decimal;}.coollinks OL{margin:5px 15px;padding:0 0 0 20px;list-style:decimal;}.coollinks OL LI {color: #000;}.topBlock{padding:5px 10px;font-size:14px;line-height: 16px;}.coollinks {position:absolute;top:0;width:70%;left:15%;background:#fff;font-size:14px;display:none;z-index:999998;box-shadow:0 3px 10px #000;}.coollinks .coolLinksIn, .coollinks .coolLinksEx{display:none;}.topBlock .psevdo{border-bottom:1px dotted #000;cursor:pointer;}.topBlock .red{color:red;}.coolBlockBody LI{margin:0;text-align:left;}.coolBlock .showList, .coolBlock .tm {cursor:pointer;}.coolBlock .showList:hover{box-shadow:0 0 5px #ccc inset;}.coolHidAlert{background: #F5AB00;}.coolBlock .coolActive {background:#fff;border-left:1px solid #9d9da1;border-right:1px solid #9d9da1;}";
                document.getElementsByTagName("body")[0].appendChild(a);
            }
            var f = location.href;
            a(".serp-adv__block").css({ background: "#ffe5e5" }); -
            1 != f.indexOf("https://www.yandex.ru/", 0) ? (asd = a('.serp-list .serp-block:not(".serp-adv"):not(".serp-block_type_realty"):not(".serp-block_type_news-rubrics"):not(".serp-block_type_market-offers"):not(".serp-block_type_auto-2"):not(".serp-adv__block"):not(".serp-block_type_news"):not(".serp-block_type_market"):not(".serp-block_type_market-ext-category"):not(".serp-block_type_market-category") .serp-item__title a'), -1 != f.indexOf("yandex.ru/images/", 0) && (asd = a(".b-serp-url__item a"))) :
                (-1 != f.indexOf("hghltd.yandex.net", 0) && a("body iframe:first").css({ display: "none" }), p(), asd = 0);
            var m = 0,
                q = 1;
            a.each(asd, function(a, c) {
                var f = c.toString().match(/^htt(p|ps):\/\/[^/]+/);
                (f ? f[0] + "/" : null) == c && m++;
                if (10 <= q) {
                    return !1;
                }
                q++;
            });
            str = '<div class="block-head"><span>\u041c\u043e\u0440\u0434 \u0432 \u0442\u043e\u043f10: <b>' + m + '</b></span> <span class="tm">\u0421\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e \u0434\u0430\u0442\u0435 (&how=tm)</span><span class="showList">\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u0442\u043e\u043f \u0441\u043f\u0438\u0441\u043a\u043e\u043c</span><b class="close">\u00d7</b></div>';
            strB = '<div class="coolBlockBody coolCollapse">';
            strB += "<ol>";
            a('.serp-list .serp-block:not(".serp-adv"):not(".serp-block_type_realty"):not(".serp-block_type_news-rubrics"):not(".serp-block_type_market-offers"):not(".serp-block_type_auto-2"):not(".serp-adv__block"):not(".serp-block_type_news"):not(".serp-block_type_market"):not(".serp-block_type_market-ext-category"):not(".serp-block_type_market-category") .serp-item__title').each(function(c, n) {
                num = c + 1;
                a(this).prepend('<span class="coolNumber">' + num + "</span>");
            });
            a.each(asd, function(a, c) {
                strB += "<li>" + c + "</li>";
            });
            strB += "</ol>";
            yaBolds = [];
            a('.serp-list .serp-block:not(".serp-adv"):not(".serp-block_type_realty"):not(".serp-block_type_news-rubrics"):not(".serp-block_type_market-offers"):not(".serp-block_type_auto-2"):not(".serp-adv__block"):not(".serp-block_type_news"):not(".serp-block_type_market"):not(".serp-block_type_market-ext-category") .serp-item__wrap b').each(function(c, f) {
                -1 === a.inArray(f.innerHTML.toLowerCase(), yaBolds) && yaBolds.push(f.innerHTML.toLowerCase());
            });
            yaBoldsTxt = "";
            a.each(yaBolds, function(a, c) {
                yaBoldsTxt += "" + c + "<br>";
            });
            yaBoldsTxt = '<div class="coolCollapse">' + yaBoldsTxt + "</div>";
            strB += yaBoldsTxt;
            strB += "</div>";
            a("body").append(strB);
            block = document.createElement("div");
            block.className = "coolBlock";
            block.innerHTML = str;
            asd && (c(), document.getElementsByTagName("body")[0].appendChild(block), a(".coolBlock").addClass("coolGray"), h = a(".coolBlock").height(), a("body").css({ "margin-top": h }));
            a(".coolBlock .showList").click(function() {
                a(".coolBlockBody").toggleClass("coolCollapse");
                a(".showList").toggleClass("coolActive");
                a(".coolBlockBody").is(":visible") && a("html, body").animate({ scrollTop: 0 }, "fast");
            });
            a(".coolBlock .tm").click(function() {
                window.location.href = f + "&how=tm";
            });
            a(".close").click(function() {
                a(".coolBlock").remove();
                a(".topBlockWrp").remove();
                a(".topBlock").remove();
                a(".coolBlockBody").remove();
                a(".coollinks").remove();
                a(".coolNumber").remove();
                a("body").removeClass("coolRelative");
                a("body").css({ "margin-top": "0" });
            });
        });
    })(jQuery);
};