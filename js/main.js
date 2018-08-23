/*shorten common functions so that I don't have to type as much*/
Object.prototype.qa = function (ipt) {
    return this.querySelectorAll(ipt);
};
Object.prototype.ev = function (ipt, cbk) {
    return this.addEventListener(ipt, cbk);
};
Object.prototype.seta = function (atb, atval) {
    return this.setAttribute(atb, atval);
};
Object.prototype.geta = function (atb) {
    return this.getAttribute(atb);
};

function qa(ipt) {
    return document.querySelectorAll(ipt);
}

function mk(ipt) {
    return document.createElement(ipt);
}

function elid(ipt) {
    return document.getElementById(ipt);
}
/*make skip link appear on focus*/
function skipLinkFocus() {
    var skip = qa(".skip");
    var mouseHov = false;

    function mouseState(val) {
        /*adapted from https://www.sitepoint.com/community/t/determine-if-mouse-is-over-an-element/4239/2*/
        mouseHov = val;
    }
    for (var i = 0; i < skip.length; i++) {
        var currSkip = skip[i];
        currSkip.nextElementSibling.ev("mouseover", function (evt) {
            mouseState(true);
        });
        /*Have to do this weird hovery behavior because blurs fire before clicks, so we can't simulate a mouse click on the fake skip link without adding hover behavior.*/
        currSkip.nextElementSibling.ev("mouseout", function (evt) {
            mouseState(false);
            if ((document.activeElement !== currSkip) && (!currSkip.nextElementSibling.classList.contains("sro"))) {
                currSkip.nextElementSibling.classList.add("sro");
            }
        });
        currSkip.nextElementSibling.ev("click", function (evt) {
            mouseState(false);
            /*apparently this doesn't conflict with the click handler in alohomora.js*/
            detectMain();
            elid("main").focus();
        });
        currSkip.ev("focus", function (evt) {
            if (currSkip.nextElementSibling.classList.contains("sro")) {
                currSkip.nextElementSibling.classList.remove("sro");
            }
        });
        currSkip.ev("focusout", function (evt) {
            if ((!currSkip.nextElementSibling.classList.contains("sro")) && (mouseHov === false)) {
                currSkip.nextElementSibling.classList.add("sro");
            }
        });
        currSkip.ev("click", function (evt) {
            detectMain();
            elid("main").focus();
        });
        currSkip.ev("keydown", function (evt) {
            if (evt.key === "Enter") {
                detectMain();
                elid("main").focus();
            }
        });
    }
}
skipLinkFocus();
/*detect heading and set as main content*/
function detectMain() {
    var mainTgt;
    if (qa("[id='main']").length === 0) {
        if (qa("h1").length > 0) {
            mainTgt = qa("h1")[0];
        }
        else if (qa("h1").length === 0 && qa("h2").length > 0) {
            mainTgt = qa("h2")[0];
        }
    }
    else if (qa("[id='main']").length === 1) {
        mainTgt = elid("main");
    }
    mainTgt.seta("tabindex", "-1");
    mainTgt.seta("id", "main");
    
    console.log("Main target set to ", mainTgt);
    return mainTgt;
}
detectMain();