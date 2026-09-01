"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        return () => this.off(event, callback);
    }
    off(event, callback) {
        if (!this.listeners[event])
            return;
        this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    }
    emit(event, payload) {
        const callbacks = this.listeners[event];
        if (callbacks) {
            callbacks.forEach((callback) => callback(payload));
        }
    }
}
exports.EventBus = EventBus;
exports.events = new EventBus();
