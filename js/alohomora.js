/*source https://stackoverflow.com/questions/15744042/events-not-being-tracked-in-new-google-analytics-analytics-js-setup*/
function analyticsThings() {
    if ("ga" in window) {
        tracker = ga.getAll()[0];
        if (tracker)
            tracker.send("event", "Test", "Test GA");
    }
}

/*end*/

/* get all buttons */
var btns = document.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
    /* do it this way, instead of via forEach, for IE compatibility */
    btns[i].addEventListener("click", function (evt) {
        mouseCheck(); /* this comes from mouseDetector.js */

    });
}
/* perform user agent detection and return numerical and textual values*/
function detectPlatform() {
    if (navigator.userAgent.match(/iPhone/) || navigator.userAgent.match(/iPod/) || navigator.userAgent.match(/iPad/)) {
        // fakeElem.innerText = "running iOS - you are running VoiceOver";
        return {
            osVal: 0,
            osTxt: "iOS"
        };
    } else if (navigator.userAgent.match(/Macintosh/)) {
        // fakeElem.innerText = "running macOS";
        return {
            osVal: 1,
            osTxt: "macOS"
        };
    } else if (navigator.userAgent.match(/Windows/)) {
        return {
            osVal: 2,
            osTxt: "Windows"
        };
    }
}
/* Generate a screen reader score that determines the likelihood of a screen reader or other AT being used */
var srScore = {
    srBrowse: 0,
    srFocus: 0,
    kbd: 0,
    fakeClicked: 0,
    OS: detectPlatform(),
    srTotal: function () {
        return this.srBrowse + this.srFocus;
    }
}