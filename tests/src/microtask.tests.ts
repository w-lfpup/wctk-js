import { nextFrame } from "@w-lfpup/jackrabbit";
import { Microtask } from "../../dist/mod.js";

let microtaskController: Microtask;

let expectedSleepy = "-_-";
let expectedHappy = "^_^";

let span: HTMLSpanElement | null;

function updateExpression() {
	if (!span) return;

	span.textContent = expectedHappy;
}

function setup() {
	microtaskController = new Microtask(updateExpression);

	document.body.setHTMLUnsafe(`
		<span>-_-</span>
	`);

	span = document.querySelector("span");
}

async function testTaskCycle() {
	if (expectedSleepy !== span?.textContent)
		return "wrong expression, expected sleepy -_-";

	microtaskController.queue();

	if (expectedSleepy !== span?.textContent)
		return "still wrong expression, still expected sleepy -_-";

	await nextFrame();

	if (expectedHappy !== span?.textContent)
		return "wrong expression after frame, expected happy ^_^";
}

export const tests = [setup, testTaskCycle];

export const options = {
	title: import.meta.url,
};
