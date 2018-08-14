    /* functions for determining if user is using a mouse */
var mouseChecks = [[], [], []];
var currCheck = 0;

function returnMouse(evt) {
    if (evt) {
//        console.log(evt);
        mouseChecks[currCheck].push(evt);
    }
}
var mouseObj = {
    check1: {
        delta: {
            x: undefined
            , y: undefined
        }
        , deltaRaw: {
            x: ""
            , y: ""
        }
        , totals: ""
    }
    , check2: {
        delta: {
            x: undefined
            , y: undefined
        }
        , deltaRaw: {
            x: ""
            , y: ""
        }
        , totals: ""
    }
    , check3: {
        delta: {
            x: undefined
            , y: undefined
        }
        , deltaRaw: {
            x: ""
            , y: ""
        }
        , totals: ""
    }
}
var checkAdj = currCheck + 1;
var tmpObj = mouseObj["check" + checkAdj];
var deltX, deltY; /* set to tmpObj.delta;*/
var deltRawX, deltRawY; /*set to tmpObj.deltaRaw;*/
var tot; /*set to tmpObj.totals;*/
var tmpX = []; /*use to verify that deltX actually works */
function updateDeltas() {
    if (currCheck > 0) {
        var currArr = mouseChecks[currCheck - 1];
//        console.log("currArr ", currArr);
        var lastX, diffX;
        var lastY, diffY;
        deltX = 0;
        deltY = 0;
        /*1. Log each screenX
        2. find how it compares to the screenX before it
        3. If the difference is < 0, reverse it
        4. Otherwise, add it
        */
        var currX, currY, lastX, lastY, diffX, diffY;
        for (var i = 0; i < currArr.length; i++) {
            if (i > 0) {
                lastX = currX;
                lastY = currY
            }
            currX = currArr[i].screenX;
            currY = currArr[i].screenY;
//            console.log("currX ", currX);
//            console.log("currY ", currY);
//            console.log("lastX ", lastX);
//            console.log("lastY ", lastY);
            if (typeof lastX !== "undefined") {
                diffX = currX - lastX;
            }
            else if (typeof lastX === "undefined") {
                diffX = 0;
            }
            if (typeof lastY !== "undefined") {
                diffY = currY - lastY;
            }
            else if (typeof lastY === "undefined") {
                diffY = 0;
            }
            if (diffX >= 0) {
                deltX += diffX;
                tmpX.push(diffX);
            }
            else {
                deltX -= diffX;
                tmpX.push(-diffX);
            }
            if (diffY >= 0) {
                deltY += diffY;
            }
            else {
                deltY -= diffY;
            }
//            console.log("diffX: ", diffX);
//            console.log("diffY: ", diffY);
        }
        /*   for (var i = 0; i < currArr.length; i++) {
               var curr2 = currArr[i];
               console.log("curr2 is now: ",curr2);
               deltX += curr2.screenX;
               deltY += curr2.screenY;
               deltX = deltX/currArr.length;
               deltY = deltY/currArr.length;
               
           }*/
//        console.log("deltX is: ", deltX);
//        console.log("deltY is: ", deltY);
    }
    tmpObj.delta.x = deltX;
    tmpObj.delta.y = deltY;
} /*end updateDeltas*/

function mouseCheck() {
    if (!document.body.classList.contains("mouseChecking")) {
        if (currCheck < mouseChecks.length) {
            document.body.classList.add("mouseChecking");
            window.addEventListener("mousemove", returnMouse);
            console.log("move check " + String(currCheck + 1) + " started");
            console.log("currCheck is: ", currCheck);
            checkAdj = currCheck + 1;
            tmpObj = mouseObj["check" + checkAdj];
            setTimeout(function () {
                window.removeEventListener("mousemove", returnMouse);
                console.log("move check " + String(currCheck + 1) + " stopped");
                currCheck++;
                //                console.log("currCheck is now: ", currCheck);
                //                console.log(mouseChecks);
                document.body.classList.remove("mouseChecking");
                updateDeltas();
            }, 5000);
        }
        else {
            console.log("currCheck has been run more than " + mouseChecks.length + " times.");
        }
    }
    else {
        console.log("Function mouseCheckShort is already running! Please wait for the function to finish running.");
    }
}