import {
	findElement,
	elementClick,
	elementSendKeys,
} from "@w-lfpup/jackrabbit";
import { Events } from "../../dist/mod.js";

let eventController: Events;
let eventReceipts: Event[] = [];

function setup() {
	eventController = new Events({
		target: document.body,
		connected: true,
		listeners: {
			click: function (e: PointerEvent) {
				eventReceipts.push(e);
			},
			input: function (e: InputEvent) {
				eventReceipts.push(e);
			},
		},
	});

	document.body.setHTMLUnsafe(`
		<input>
		<button>
	`);
}

async function testClickEvents() {
	let buttonId = await findElement("button");
	if (!buttonId) return "failed to query button";
	await elementClick(buttonId);
	await elementClick(buttonId);

	let clicks = [];
	for (let event of eventReceipts) {
		if ("click" === event.type) clicks.push(event);
	}

	if (2 !== clicks.length)
		return `incorrect number of clicks: ${clicks.length}/2`;
}

async function testInputEvents() {
	const expectedMessage = "UwU";
	let inputId = await findElement("input");
	if (!inputId) return "failed to query input element";

	await elementSendKeys(inputId, expectedMessage);
	let inputs = [];
	for (let event of eventReceipts) {
		if ("input" === event.type) inputs.push(event);
	}

	if (3 !== inputs.length)
		return `incorrect number of input events: ${inputs.length}/1`;

	let input = document.body.querySelector("input");
	if (expectedMessage !== input?.value)
		return `expected input: ${expectedMessage}, found: ${input?.value}`;
}

function tearDown() {
	eventController.disconnect();
}

export const tests = [setup, testClickEvents, testInputEvents, tearDown];

export const options = {
	title: import.meta.url,
};
