class Styles {
	#root: DocumentOrShadowRoot;

	constructor(
		sr: DocumentOrShadowRoot,
		stylesheetTemplates: (CSSStyleSheet | string)[],
	) {
		this.#root = sr;
		this.#root.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
	}

	get adoptedStyleSheets(): CSSStyleSheet[] {
		return this.#root.adoptedStyleSheets;
	}

	set adoptedStyleSheets(stylesheetTemplates: (CSSStyleSheet | string)[]) {
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
