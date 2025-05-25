interface BindParamsInterface {
	host: Object;
	callbacks: Function[];
}

class Bind {
	constructor(params: BindParamsInterface) {
		let { host, callbacks } = params;

		for (let callback of callbacks) {
			console.log("maybeeee...");
			// do not bind and replace already bound functions
			if (
				!callback.hasOwnProperty("prototype") &&
				callback instanceof Function
			) {
				console.log("binding a function!", callback.name);
				let { name } = callback;
				if (!name.startsWith("#"))
					host[name as keyof typeof host] = callback.bind(host);
			}
		}
	}
}

export { Bind };
