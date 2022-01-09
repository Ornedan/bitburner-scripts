/** @param {NS} ns **/
export async function main(ns) {
	const karma0 = ns.heart.break();
	ns.disableLog("sleep");
    while(ns.heart.break() > karma0 - 10000) {
		ns.commitCrime("homicide");
		while(ns.isBusy()) {
			await ns.sleep(100);
		}
	}
}