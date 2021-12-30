export function log(ns, level, format, ...args) {
    ns.print(ns.sprintf("%s " + format, level, ...args));
}

export function tlog(ns, level, format, ...args) {
    ns.tprintf("%s [%s] " + format, level, new Date().toISOString(), ...args);
}