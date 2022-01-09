import { getServerGraph, pathTo } from "/lib/deepscan.ns";

/** @param {NS} ns **/
export async function main(ns) {
	parent.testState = "RUNNING";

	try {
		const scans = getServerGraph(ns);
		const path = pathTo(scans, ns.getCurrentServer(), "ecorp");
		for (const host of path)
			ns.connect(host);

		await ns.installBackdoor();
		parent.testState = "RETURN";
	}
	catch (e) {
		parent.testState = "THROW";
		throw e;
	}
	finally {
		ns.connect("home");
	}
}