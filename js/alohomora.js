
/* get all buttons */

function runThing() {
    console.log("running runThing");
     ga("send", "event", "Alohomora", "Wave");
    
}
var btns = document.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
    /* do it this way, instead of via forEach, for IE compatibility */
    btns[i].addEventListener("click", function (evt) {
        mouseCheck(); /* this comes from mouseDetector.js */
        ga("send", "event", "Alohomora", "Wave");
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