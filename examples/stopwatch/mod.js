import { Stopwatch } from "./stopwatch.js";
customElements.define("stopwatch-wc", Stopwatch);
const stopwatch = document.querySelector("stopwatch-wc");
document.addEventListener("click", function (e) {
    console.log(stopwatch);
    if (stopwatch && e.target instanceof HTMLButtonElement) {
        e.target.hasAttribute("start") ? stopwatch.start() : stopwatch.pause();
    }
});
