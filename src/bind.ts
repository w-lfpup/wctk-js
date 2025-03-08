type Callbacks = Function[];

class Bind {
	constructor(el: Object, callbacks: Callbacks) {
		// do not bind and replace anonymous functions or private methods
		for (let cb of callbacks) {
			if (cb instanceof Function) {
				let name = cb.name;
				if (name && !name.startsWith("#")) {
					el[name] = cb.bind(el);
				}
			}
		}
	}
}

export type { Callbacks };

export { Bind };
