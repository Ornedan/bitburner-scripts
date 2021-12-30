import { getServerGraph } from "/lib/deepscan.ns";

export const HOME_RESERVE_MEM = 64;

/** @param {NS} ns **/
export function getAvailableRam(ns, useReserve = false) {
    const servers = getServerGraph(ns);
    const ram = [];

    for (const server in servers) {
        if (!ns.hasRootAccess(server))
            continue;

        const total = ns.getServerMaxRam(server);
		const used = ns.getServerUsedRam(server);
        const free = total - used - ((server == "home" && !useReserve) ? HOME_RESERVE_MEM : 0);
        if (free > 0)
            ram.push({ sid: server, free: free });
    }

    // Sort by memory, biggest free chunks first
    ram.sort((r1, r2) => {
        return r2.free - r1.free;
    });

    return ram;
}