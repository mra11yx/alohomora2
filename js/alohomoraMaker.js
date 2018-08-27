function alohomoraAllTheThings() {
    "use strict";

    function buildTemplate(currEl, elType, hasHref, elClasses) {
        /*todo: create a case for this to work on headings and paragraphs.
        - hide real heading but DON'T create 'real' version
        - style fake one 
        */
        var fake, real, fakeType;


        if (elType === "button") {
            fakeType = "div";
            real = document.createElement("div");
        } else if (elType === "link") {
            fakeType = "span";
            real = document.createElement("div");
        } else if (elType === "text") {
            fakeType = "div";
            real = currEl;
        }
        fake = document.createElement(fakeType);


        if (elClasses.length > 0) {
            for (var i = 0; i < elClasses.length; i++) {
                if (elClasses[i] !== "alohomora") {
                    fake.classList.add(elClasses[i]); /* to style the fake link. todo: what if there are important classes on the real link? */
                }

            }
        }

        fake.classList.add("fake");
        if (currEl.hasAttribute("id")) {
            real.setAttribute("id", currEl.getAttribute("id"));
        }
        fake.innerText = currEl.innerText;
        fake.setAttribute("aria-hidden", "true");

        /*adjust the real one*/
        real.classList.add("sro"); /*make the real control screen reader-only*/
        real.classList.add("real");
        if (elType && elType !== "text") {
            real.setAttribute("role", elType);
        }
        if (elType === "link" && currEl.hasAttribute("href")) {
            console.log("elType is: ", elType);
            console.log("Has href? ", hasHref);
            real.setAttribute("data-target", currEl.getAttribute("href"));
        }


        if (elType === "link" || elType === "button") {
            real.setAttribute("tabindex", "0");
            real.innerText = currEl.innerText;
        } else if (elType === "text") {
            currEl.setAttribute("tabindex", "-1");
            /*todo: make this not conflict with the focus management thingy */
            /*add CSS for styling fake headings etc */
            fake.classList.add(currEl.nodeName.toLowerCase());
        }
        currEl.parentElement.insertBefore(fake, currEl);
        if (elType === "button" || elType === "link") {
            currEl.parentElement.insertBefore(real, fake);
            currEl.remove(); /*remove the real element from the DOM - NOT FOR TEXT */
        }

    } /*end makeTemplate*/

    var allEls = document.querySelectorAll("a.alohomora, button.alohomora, h1.alohomora, h2.alohomora, p.alohomora");
    for (var i = 0; i < allEls.length; i++) {
        var curr = allEls[i];
        var pt = curr.parentElement;
        var elType;
        var hasHref = curr.hasAttribute("href");
        console.log("hasHref in main function: ", hasHref);
        var elClasses = curr.classList;
        switch (curr.nodeName.toLowerCase()) {
        case "a":
            elType = "link";
            break;
        case "button":
            elType = "button";
            break;
        case "h1":
            console.log(curr.nodeName);
            elType = "text";
            break;
        case "h2":
            console.log(curr.nodeName);
            elType = "text";
            break;
        case "p":
            console.log(curr.nodeName);
            elType = "text";
            break;
        default:
            elType = null;
            break;
        }
        console.log("elType is: ", elType);

        buildTemplate(curr, elType, hasHref, elClasses);

    } /*end looping through elements */

} /*end alohomoraAllTheThings*/