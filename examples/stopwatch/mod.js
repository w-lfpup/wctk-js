import { Stopwatch } from "./stopwatch.js";
customElements.define("stopwatch-wc", Stopwatch);
const stopwatch = document.querySelector("stopwatch-wc");
document.addEventListener("click", function (e) {
    if (stopwatch && e.target instanceof HTMLButtonElement) {
        if (e.target.hasAttribute("start"))
            stopwatch.start();
        if (e.target.hasAttribute("pause"))
            stopwatch.pause();
        if (e.target.hasAttribute("stop"))
            stopwatch.stop();
    }
});
