/* get all buttons */
var btns = document.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
    /* do it this way, instead of via forEach, for IE compatibility */
    btns[i].addEventListener("click", function (evt) {
        if (detectCurrCheck()) {
            findMouse(currCheck);
            currCheck++;
        } else {
            console.log("findMouse has already been run 3 times.");
        }
    });
}
/* perform user agent detection and return numerical and textual values*/
function detectPlatform() {
    if (navigator.userAgent.match(/iPhone/) || navigator.userAgent.match(/iPod/) || navigator.userAgent.match(/iPad/)) {
        // fakeElem.innerText = "running iOS - you are running VoiceOver";
        return {
            osVal: 0
            , osTxt: "iOS"
        };
    }
    else if (navigator.userAgent.match(/Macintosh/)) {
        // fakeElem.innerText = "running macOS";
        return {
            osVal: 1
            , osTxt: "macOS"
        };
    }
    else if (navigator.userAgent.match(/Windows/)) {
        return {
            osVal: 2
            , osTxt: "Windows"
        };
    }
}
/* Generate a screen reader score that determines the likelihood of a screen reader or other AT being used */
var srScore = {
        srBrowse: 0
        , srFocus: 0
        , kbd: 0
        , fakeClicked: 0
        , OS: detectPlatform()
        , srTotal: function () {
            return this.srBrowse + this.srFocus;
        }
    }
    /* variable to determine the results of mouse checks 1, 2, and 3 */
var mouseChecks = [0, 0, 0];
var currCheck = 0;
var mouseCheckVal = 0;

function detectCurrCheck() {
    return currCheck < mouseChecks.length;
}
/* return something other than undefined if mouse moved */
function returnMouse(evt) {
    if (evt) {
        mouseCheckVal++;
    }
    return mouseCheckVal;
}

function findMouse(i) {
    if (typeof i !== "undefined" && i >= 0 && i < mouseChecks.length) {
        mouseCheckVal = 0;
        window.addEventListener("mousemove", returnMouse);
        console.log("mouseCheckVal is: ", mouseCheckVal);
        console.log("mouse detection started!");
        setTimeout(function () {
            window.removeEventListener("mousemove", returnMouse);
            console.log("mouse detection stopped!");
            console.log("mouseCheckVal now is: ", mouseCheckVal);
            mouseChecks[i] = mouseCheckVal;
            return true;
        }, 5000);
    }
    else {
        console.log("invalid value for i");
    }
}

function setMouseChecks(i) {
    mouseChecks[i] = mouseCheckVal;
    console.log("mousechecks " + mousechecks[i]);
}

function runMouseTimer() {
    findMouse(currCheck);
    currCheck++;
    window.setInterval(function () {
        if (currCheck < mouseChecks.length) {
            findMouse(currCheck);
            currCheck++;
        }
    }, 10000);
}