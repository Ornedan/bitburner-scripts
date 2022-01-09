import { log, tlog } from "/lib/logging.ns";

/** @param {NS} ns **/
export async function main(ns) {
	const { target } = ns.flags([
		["target", 0]
	]);

	const start = performance.now();
	const int0 = ns.getPlayer().intelligence;

	let round = 1;
	while (ns.getPlayer().intelligence < target) {
		grindRound(ns);
		round += 1;
		await ns.sleep(500);
	}

	const end = performance.now();
	tlog(ns, "SUCCESS", "Reached %d int (gain %d) after %d rounds, took %s", 
		target, ns.getPlayer().intelligence - int0, round, ns.tFormat(end - start));
}

function grindRound(ns) {
	ns.travelToCity("Sector-12");

	for (let i = 0; i < 1e4; i++)
		ns.goToLocation("DeltaOne");
}