class Styles {
	#root: DocumentOrShadowRoot;

	constructor(
		sr: DocumentOrShadowRoot,
		stylesheetTemplates: (CSSStyleSheet | string)[],
	) {
		this.#root = sr;
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

function styles(
	sr: DocumentOrShadowRoot,
	stylesheetTemplates: (CSSStyleSheet | string)[],
) {
	sr.adoptedStyleSheets = getStylesheets(stylesheetTemplates);
}

export { styles, Styles };
