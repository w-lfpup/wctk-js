type Callbacks = Array<[string, EventListenerOrEventListenerObject]>

// class Events<T> {
//     #connected: boolean = false;
//     #el: Node;
//     #events: Callbacks = [];

// 	constructor(
//         el: Node,
//         callbacks: Callbacks,
//     ) {
//         this.#el = el;

//         for (let [name, cb] of callbacks) {
//             let callback = cb;
//             if (callback instanceof Function) {
//                 callback = callback.bind(this.#el);
//             }
//             this.#events.push([name, callback]);
//         }

//         this.connect();
// 	}

//     connect() {    
//         if (this.#connected) return;
//         this.#connected = true;
//         for (let [name, callback] of this.#events) {
//             this.#el.addEventListener(name, callback);
//         }
//     }

//     disconnect() {
//         for (let [name, eventName] of this.#events) {
//             const callback = this.#callbacks.get(name);
//             if (callback) {
//                 this.#el.removeEventListener(eventName, callback);
//             }
//         }
//     }

//     get connected(): boolean {
//         return this.#connected;
//     }
// }

function connect(el: HTMLElement, callbacks: Callbacks): Callbacks {
    let boundCallbacks: Callbacks = [];
    for (let [name, cb] of callbacks) {
        let callback = cb;
        if (callback instanceof Function) {
            callback = callback.bind(el);
        }
        boundCallbacks.push([name, callback]);
        el.addEventListener(name, callback);
    }

    return boundCallbacks;
}

function disconnect(el: HTMLElement, callbacks: Callbacks) {
    for (let [name, callback] of callbacks) {
        el.removeEventListener(name, callback);
    }
}

function bind(el: HTMLElement, callbacks: Callbacks) {
    const boundCallbacks = new Map<string, EventListenerOrEventListenerObject>();
    for (let [name, callback] of callbacks) {
        let boundCallback = callback;
        if (callback instanceof Function) {
            boundCallback = callback.bind(el)
        }
        boundCallbacks.set(name, boundCallback);
    }

    return boundCallbacks;
}

// export { bind, Events, connect, disconnect };
export { bind, connect, disconnect };
