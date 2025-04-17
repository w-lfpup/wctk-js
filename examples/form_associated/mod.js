import "./text_input.js";

const results = document.querySelector("[results]");

document.addEventListener("submit", function (e) {
	if (!(e.target instanceof HTMLFormElement)) return;

	e.preventDefault();
	
	let formdata = new FormData(e.target);

	let data = {};
	for (let [name, value] of formdata.entries()) {
		data[name] = value;
	}

	results.textContent = JSON.stringify(data, undefined, " ");
});
