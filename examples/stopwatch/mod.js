import { Stopwatch } from "./stopwatch.js";
customElements.define("stopwatch-wc", Stopwatch);
const stopwatch = document.querySelector("stopwatch-wc");
let receipt;
function draw(timestamp) {
    if (!stopwatch)
        return;
    receipt = requestAnimationFrame(draw);
    stopwatch.update(timestamp);
}
function start() {
    if (!stopwatch)
        return;
    requestAnimationFrame(draw);
}
function pause() {
    cancelAnimationFrame(receipt);
}
document.addEventListener("click", function (e) {
    if (stopwatch && e.target instanceof HTMLButtonElement) {
        e.target.hasAttribute("start") ? start() : pause();
    }
});
