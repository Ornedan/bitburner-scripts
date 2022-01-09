/** @param {NS} ns **/
export async function main(ns) {
	parent.testState = "RUNNING";

	try {
		await ns.weaken("ecorp");
		parent.testState = "RETURN";
	}
	catch(e) {
		parent.testState = "THROW";
		throw e;
	}
}