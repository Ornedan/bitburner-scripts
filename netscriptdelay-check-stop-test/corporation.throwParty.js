/** @param {NS} ns **/
export async function main(ns) {
	parent.testState = "RUNNING";

	try {
		await ns.corporation.throwParty("Energy", "Sector-12", 1000);
		parent.testState = "RETURN";
	}
	catch(e) {
		parent.testState = "THROW";
		throw e;
	}
}