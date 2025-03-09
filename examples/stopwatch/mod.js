import "./stopwatch.js";

const stopwatch = document.querySelector("stopwatch-wc");

document.addEventListener("click", function (e) {
	if (e.target instanceof HTMLButtonElement) {
		e.target.hasAttribute("start") ? stopwatch.start() : stopwatch.pause();
	}
});
