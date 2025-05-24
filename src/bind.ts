interface BindParamsInterface {
	target: Object;
	callbacks: Function[];
}

class Bind {
	constructor(params: BindParamsInterface) {
		let { target, callbacks } = params;

		for (let callback of callbacks) {
			// do not bind and replace already bound functions
			if (callback.hasOwnProperty("prototype")) continue;
			if (callback instanceof Function) {
				let { name } = callback;
				if (!name.startsWith("#"))
					target[name as keyof typeof target] = callback.bind(target);
			}
		}
	}
}

export { Bind };
