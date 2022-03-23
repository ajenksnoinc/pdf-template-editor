export interface Emitter<E extends { [key: string]: [...any] } = {}> {
    /**
     * Subscribe to an event
     * @param event Event name
     * @param callback Event handler
     */
    on<T extends keyof E>(event: T, listener: (...args: E[T]) => void): void;

    /**
     * Unsubscribe from an event
     * @param event Event name
     * @param callback Event handler
     * @returns True if existed and successfully removed
     */
    once<T extends keyof E>(event: T, listener: (...args: E[T]) => void): void;

    /**
     * Subscribe to the first instance of the event that occurs
     * @param event Event name
     * @param callback Event handler
     */
    off<T extends keyof E>(event: T, listener: (...args: E[T]) => void): boolean;

    /**
     * Publish an event to the emitter
     * @param event Event name
     * @param args Event data
     */
    emit<T extends keyof E>(event: T, ...args: E[T]): boolean;

    /**
     * Remove all listeners for an event
     * @param event Event name
     */
     removeAllListeners<T extends keyof E>(event: T): boolean;
}

const createEmitter = <E extends { [key: string]: [...any] } = {}>() => {
    let listeners = new Map();

    const on = (event, listener) => {
        if(!listeners.has(event)) {
            listeners.set(event, new Set());
        }

        listeners.get(event).add(listener);
    };

    const off = (event, listener) => {
        if(!listeners.has(event))
            return false;

        return listeners.get(event).delete(listener);
    };

    const once = (event, listener) => {
        let wrapper = (...args) => {
            off(event, wrapper);
            return listener(...args);
        };

        on(event, wrapper);
    };

    const emit = (event, ...args) => {
        if(listeners.has(event) && listeners.get(event).size) {
            listeners.get(event).forEach(handler => handler(...args));
            return true;
        }

        return false;
    };

    const removeAllListeners = (event) => {
        return listeners.delete(event);
    };

    const emitter: Emitter<E> = { on, off, once, emit, removeAllListeners };
    return emitter;
};

export default createEmitter;
