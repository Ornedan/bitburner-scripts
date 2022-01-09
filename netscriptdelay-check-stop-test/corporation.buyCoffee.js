/** @param {NS} ns **/
export async function main(ns) {
	parent.testState = "RUNNING";

	try {
		await ns.corporation.buyCoffee("Energy", "Sector-12");
		parent.testState = "RETURN";
	}
	catch(e) {
		parent.testState = "THROW";
		throw e;
	}
}