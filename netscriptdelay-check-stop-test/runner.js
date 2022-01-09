/** @param {NS} ns **/
export async function main(ns) {
	/*
	if(!ns.args[0]) {
		ns.tprintf("ERROR missing target function argument");
	}
	const target = ns.sprintf("/test/%s.js", ns.args[0]);*/

	const targets = [
		"asleep", "sleep",
		"hack", "grow", "weaken",
		"installBackdoor",
		"corporation.assignJob", "corporation.buyCoffee", "corporation.throwParty",
		"stanek.charge",
	];

	for(const target of targets)
		await runTest(ns, target);
}

async function runTest(ns, func) {
	// States
	//
	//  INIT -> RUNNING -> RETURN
	//                  \> THROW
	//
	// We expect that the delayed functions throw WorkerScript if the script is
	// killed during delay

	ns.tprintf("INFO testing kill/throw behaviour of function %s", func);
	const target = ns.sprintf("/test/%s.js", func);

	parent.testState = "INIT";
	const pid = ns.exec(target, "home");

	// Give the script a moment to start and pause awaiting for the test target function
	await ns.sleep(100);
	if(parent.testState != "RUNNING") {
		ns.tprintf("ERROR target script (PID %d) state expected RUNNING, was %s", pid, parent.testState);
		ns.kill(pid);
		while(ns.isRunning(pid))
			await ns.sleep(100);
		return;
	}
	
	// Kill the target and give it a moment to die
	ns.kill(pid);
	await ns.sleep(100);

	if(parent.testState != "THROW")
		ns.tprintf("ERROR target script (PID %d) state expected THROW, was %s", pid, parent.testState);
	else
		ns.tprintf("SUCCESS function %s threw when script was killed during it's delay", func);
}