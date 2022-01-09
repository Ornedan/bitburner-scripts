/** @param {NS} ns **/
export async function main(ns) {
	while (buyPrograms(ns))
		await ns.sleep(60 * 1000);
	
}

/** @param {NS} ns **/
function buyPrograms(ns) {
	// No tor, and can't get it? Back to waiting
	if (!(ns.getPlayer().tor || ns.purchaseTor()))
		return true;

	// Try to buy each missing program in order of importance
	if (!ns.fileExists("BruteSSH.exe", "home"))
		if (!ns.purchaseProgram("BruteSSH.exe"))
			return true;
	if (!ns.fileExists("FTPCrack.exe", "home"))
		if (!ns.purchaseProgram("FTPCrack.exe"))
			return true;
	if (!ns.fileExists("relaySMTP.exe", "home"))
		if (!ns.purchaseProgram("relaySMTP.exe"))
			return true;
	if (!ns.fileExists("HTTPWorm.exe", "home"))
		if (!ns.purchaseProgram("HTTPWorm.exe"))
			return true;
	if (!ns.fileExists("SQLInject.exe", "home"))
		if (!ns.purchaseProgram("SQLInject.exe"))
			return true;
	
	// These are not actually necessary, but buying them gives some intelligence EXP
	if (!ns.fileExists("ServerProfiler.exe", "home"))
		if (!ns.purchaseProgram("ServerProfiler.exe"))
			return true;
	if (!ns.fileExists("DeepscanV1.exe", "home"))
		if (!ns.purchaseProgram("DeepscanV1.exe"))
			return true;
	if (!ns.fileExists("DeepscanV2.exe", "home"))
		if (!ns.purchaseProgram("DeepscanV2.exe"))
			return true;
	if (!ns.fileExists("AutoLink.exe", "home"))
		if (!ns.purchaseProgram("AutoLink.exe"))
			return true;
	if (!ns.fileExists("Formulas.exe", "home"))
		if (!ns.purchaseProgram("Formulas.exe"))
			return true;

	// Nothing more to buy
	return false;
}