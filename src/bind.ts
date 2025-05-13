class Bind {
	constructor(el: Object, callbacks: Function[]) {
		// do not bind and replace anonymous functions or private methods
		for (let cb of callbacks) {
			if (cb instanceof Function) {
				let name = cb.name;
				if (name && !name.startsWith("#")) {
					el[name as keyof Object] = cb.bind(el);
				}
			}
		}
	}
}

export { Bind };
