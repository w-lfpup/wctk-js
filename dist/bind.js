class Bind {
    constructor(el, callbacks) {
        // do not bind and replace anonymous functions or private methods
        for (let cb of callbacks) {
            console.log(cb);
            if (cb instanceof Function) {
                let name = cb.name;
                if (name && !name.startsWith("#")) {
                    console.log(`binding ${name} to:`, cb, el);
                    el[name] = cb.bind(el);
                }
            }
        }
    }
}
export { Bind };
