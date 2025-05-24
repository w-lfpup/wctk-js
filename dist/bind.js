class Bind {
    constructor(params) {
        let { target, callbacks } = params;
        for (let callback of callbacks) {
            // do not bind and replace already bound functions
            if (callback.hasOwnProperty("prototype"))
                continue;
            if (callback instanceof Function) {
                let { name } = callback;
                if (!name.startsWith("#"))
                    target[name] = callback.bind(target);
            }
        }
    }
}
export { Bind };
