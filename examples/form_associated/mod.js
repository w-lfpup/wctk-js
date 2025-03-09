import "./text_input.js";

const results = document.querySelector("[results]");

document.addEventListener("submit", function (e) {
	e.preventDefault();

	if (!(e.target instanceof HTMLFormElement)) return;
	let formdata = new FormData(e.target);

	let data = {};
	for (let [name, value] of formdata.entries()) {
		data[name] = value;
	}

	results.textContent = JSON.stringify(data, undefined, " ");
});
