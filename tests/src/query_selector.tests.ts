import { QuerySelector } from "../../dist/mod.js";

let qs: QuerySelector;
function setup() {
	qs = new QuerySelector(document.body);

	document.body.setHTMLUnsafe(`
		<p>
			<span data-first>hello</span>
			<span data-second>hai :3</span>
		</p>
	`);
}

function testQuerySelector() {
	let p = qs.querySelector("p");
	let span = qs.querySelector("span");

	if (!p) return "failed to query p";
	if (!span) return "failed to query span";
}

function testQuerySelectorAll() {
	let peas = qs.querySelectorAll("p");
	let spans = qs.querySelectorAll("span");

	if (!peas.length) return "failed to query peas";
	if (!spans.length) return "failed to query spans";
	if (1 !== peas.length) return `failed to query ${peas.length}/1 peas`;
	if (2 !== spans.length) return `failed to query ${spans.length}/2 spans`;
}

function testDeleteAll() {
	qs.deleteAll();
}

export const tests = [
	setup,
	testQuerySelector,
	testQuerySelectorAll,
	testDeleteAll,
];

export const options = {
	title: import.meta.url,
};
