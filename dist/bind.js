class Bind {
    constructor(params) {
        let { host, callbacks } = params;
        for (let callback of callbacks) {
            // do not bind and replace already bound functions
            if (!callback.hasOwnProperty("prototype") &&
                callback instanceof Function) {
                let { name } = callback;
                if (!name.startsWith("#"))
                    host[name] = callback.bind(host);
            }
        }
    }
}
export { Bind };
