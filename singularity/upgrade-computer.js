/** @param {NS} ns **/
export async function main(ns) {
	const cost = ns.getUpgradeHomeCoresCost();
	if(await ns.prompt(ns.sprintf("Purchase memory upgrade for %s", cost)))
		ns.upgradeHomeRam();

	//while(ns.upgradeHomeCores());
}