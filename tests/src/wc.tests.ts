import { findElement } from "@w-lfpup/jackrabbit/browser/dist/commands.js";

function setup() {}

function testDeclarativeShadowDomExists() {}
function testDeclarativeShadowDomDoesNotExist() {}

// testing form values might involve features JR has yet to implement, refresh page and such

function tearDown() {}

export const tests = [
	setup,
	testDeclarativeShadowDomExists,
	testDeclarativeShadowDomDoesNotExist,
	tearDown,
];

export const options = {
	title: import.meta.url,
};
