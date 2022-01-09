import { getServerGraph, pathTo } from "/lib/deepscan.ns";
import { tlog } from "/lib/logging.ns";

/** @param {NS} ns **/
export async function main(ns) {
    const scans = getServerGraph(ns);
    const player = ns.getPlayer();

    const targets = Object.keys(scans).filter(host => {
        const server = ns.getServer(host);
        return !server.backdoorInstalled &&
            !server.purchasedByPlayer &&
            server.hasAdminRights &&
            server.requiredHackingSkill <= player.hacking;
    });

    for (const target of targets) {
        tlog(ns, "DEBUG", "Traveling to %s and installing backdoor", target);
        const path = pathTo(scans, ns.getCurrentServer(), target);
        for (const host of path) {
            if (!ns.connect(host)) {
                tlog(ns, "ERROR", "Failed to connect to %s along path from %s: %s", host, target, JSON.stringify(path));
                return;
            }
        }

        await ns.installBackdoor();

        if (!ns.getServer(target).backdoorInstalled) {
            tlog(ns, "ERROR", "Failed to install backdoor on %s", target);
            return;
        }
        tlog(ns, "SUCCESS", "Installed backdoor on %s", target);
    }

    tlog(ns, "INFO", "All available servers backdoored");
}