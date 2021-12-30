import { IPC_PORT } from "/lib/ports.js";

/** @param {NS} ns **/
export function getIPCStore(ns) {
    let store = ns.getPortHandle(IPC_PORT).peek();
    if (store == "NULL PORT DATA") {
        store = {};
        ns.getPortHandle(IPC_PORT).write(store);
    }
    return store;
}