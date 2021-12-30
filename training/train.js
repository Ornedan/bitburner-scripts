import { log, tlog } from "/lib/logging.ns";
import { TRAINING_PORT } from "/lib/ports.js";
import { getAvailableRam } from "/lib/ram.js";
import { startWorkers, workerCall } from "/lib/ns-cluster/controller.ns";

const SCRIPT_ANALYZE = "/training/analyze.ns";
const SCRIPT_PREPARE = "/hack-cluster/prepare.ns";
const SCRIPT_TRAIN = "/hack-cluster/grow.ns";

/** @param {NS} ns **/
export async function main(ns) {
    debugger;
    let { target, minSkill, useReserve } = ns.flags([
        ["target", ""],
        ["minSkill", -1],
        ["useReserve", false],
    ]);

    // Auto-target?
    if (!target)
        target = await invokeAnalyze(ns);

    // Check preconditions
    if (!ns.hasRootAccess(target))
        throw new Error("Training target problem: no root access to " + target);

    // Ensure the target is min-sec and max-money
    await invokePrepare(ns, target);

    // Calculate packing
    const trainMem = ns.getScriptRam(SCRIPT_TRAIN, "home");
    const ram = getAvailableRam(ns, useReserve);
    const threads = {};

    for (const server of ram) {
        const fit = Math.floor(server.free / trainMem);
        if (fit > 0)
            threads[server.sid] = fit;
    }

    // Deploy worker script to non-home servers
    for (const server in threads) {
        if (server == "home")
            continue;
        await ns.scp(SCRIPT_TRAIN, "home", server);
    }

    // Hand off to the controller script
    tlog(ns, "INFO", "Starting training with configuration: %s",
        JSON.stringify({ target, minSkill, threads }));

    await stage2(ns, target, minSkill, threads);
}

/** @param {NS} ns **/
async function invokeAnalyze(ns) {
    const pid = ns.exec(SCRIPT_ANALYZE, "home", 1, "--port");
    while (ns.isRunning(pid)) {
        log(ns, "INFO", "waiting for analyze to finish");
        await ns.sleep(1000);
    }

    return ns.getPortHandle(TRAINING_PORT).read();
}

/** @param {NS} ns @param {String} target **/
async function invokePrepare(ns, target) {
    const pid = ns.exec(SCRIPT_PREPARE, "home", 1, target);
    while (ns.isRunning(pid)) {
        log(ns, "INFO", "waiting for prepare to finish on %s", target);
        await ns.sleep(10 * 1000);
    }
}

/** @param {NS} ns **/
export async function stage2(ns, target, minSkill, threads) {
    const workerSpecs = {};
    for (const server in threads)
        workerSpecs[server] = { script: SCRIPT_TRAIN, server: server, threads: threads[server] };

    const workers = await startWorkers(ns, workerSpecs);

    try {
        const im = { dead: false };
        const drivers = [];

        for (const id in workers)
            drivers.push(driver(workers[id], im, target));

        try {
            while (!im.dead && (minSkill == -1 || ns.getHackingLevel() < minSkill)) {
                await ns.sleep(1000);
            }
            if (!im.dead) {
                tlog(ns, "SUCCESS", "training reached target skill level %d", minSkill);
                im.dead = true;
                await Promise.all(drivers);
            }
        } catch (error) {
            im.dead = true;
            throw error;
        }
    } finally {
        //        for (const id in workers)
        //            workers[id].quit();
    }
}

async function driver(worker, im, target) {
    try {
        // Workers stop if controller is dead
        while (!im.dead) {
            await workerCall(worker, "grow", target);
        }
    } catch (error) {
        console.log("Training worker died:", error);
        // Pass error to worker script through the promise
        worker.die(error);
        // If a worker dies, controller should also die
        im.dead = true;
    }
    finally {
        worker.quit();
    }
}