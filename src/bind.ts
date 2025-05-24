class Bind {
	constructor(el: Object, callbacks: Function[]) {
		// do not bind and replace anonymous functions or private methods
		for (let cb of callbacks) {
			if (cb instanceof Function) {
				let name = cb.name as keyof Object;
				if (name && !name.startsWith("#")) {
					el[name] = cb.bind(el);
				}
			}
		}
	}
}

export { Bind };
