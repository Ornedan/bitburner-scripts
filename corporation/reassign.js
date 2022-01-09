/** @param {NS} ns **/
export async function main(ns) {
	// "Unassigned", "Management", "Training"

	const promises = [];
	for (const name of ns.corporation.getOffice("Tob", "Sector-12").employees) {
		const employee = ns.corporation.getEmployee("Tob", "Sector-12", name);
		if (employee.pos == "Unassigned") {
			debugger;
			const promise = ns.corporation.assignJob("Tob", "Sector-12", name, "Management");
			await promise;
			//promises.push(promise);
		}
			
	}

	//await Promise.all(promises);

//	for(let i = 0; i < 1300; i++)
//		ns.corporation.hireEmployee("Tob", "Sector-12");
}