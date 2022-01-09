/** @param {NS} ns **/
export async function main(ns) {
	parent.testState = "RUNNING";

	try {
		const name = ns.corporation.getOffice("Energy", "Sector-12").employees[0];
		const employee = ns.corporation.getEmployee("Energy", "Sector-12", name);
		const newJob = employee.pos == "Unassigned" ? "Training" : "Unassigned";

		await ns.corporation.assignJob("Energy", "Sector-12", name, newJob);
		parent.testState = "RETURN";
	}
	catch (e) {
		parent.testState = "THROW";
		throw e;
	}
}