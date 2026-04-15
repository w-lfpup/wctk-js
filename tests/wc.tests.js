import { findElement, log } from "@w-lfpup/jackrabbit/browser/dist/commands.js";
function lilTest() {
    let elId = findElement("p");
    log("howdy!");
    return "we fail";
}
export const tests = [lilTest];
export const options = {
    title: import.meta.url,
};
