class Styles {
	#root: DocumentOrShadowRoot;

	constructor(
		sd: DocumentOrShadowRoot,
		stylesheetTemplates: (CSSStyleSheet | string)[],
	) {
		this.#root = sd;
		this.#root.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
	}

	set adoptedStylesheets(stylesheetTemplates: (CSSStyleSheet | string)[]) {
		this.#root.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
	}
}

function getStylesheets(
	stylesheetTemplates: (CSSStyleSheet | string)[],
): CSSStyleSheet[] {
	let stylesheets: CSSStyleSheet[] = [];
	for (let stylesheetTemplate of stylesheetTemplates) {
		if (stylesheetTemplate instanceof CSSStyleSheet) {
			stylesheets.push(stylesheetTemplate);
		}

		if (typeof stylesheetTemplate === "string") {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(stylesheetTemplate);
			stylesheets.push(sheet);
		}
	}

	return stylesheets;
}

export { Styles };
