/** @param {NS} ns **/

// usage: run corp-optimal-materials.js [industry type] [desired storage space]
// example:
// run corp-optimal-materials.js Software 200
// output: 	Hardware: 1.529k		RealEstate: 14.112k		Robots: 0k		AICores: 0.377k

export async function main(ns) {
	let optimalMaterials = optimalMaterialStorage(ns.args[0], ns.args[1]);
	let printString = ""
	for (let mat in optimalMaterials)
		printString += mat + ": " + (Math.round(optimalMaterials[mat])/1e3).toString() + "k\t\t";
	ns.tprint(printString);
    
	function optimalMaterialStorage(divisionType, size) {
		const matProdFactors = {
			"Energy": 			{"Hardware": 0., 	"RealEstate": 0.65, "Robots": 0.05, "AICores": 0.3},
			"Utilities": 		{"Hardware": 0., 	"RealEstate": 0.5, 	"Robots": 0.4, 	"AICores": 0.4},
			"Agriculture": 		{"Hardware": 0.2, 	"RealEstate": 0.72, "Robots": 0.3, 	"AICores": 0.3},
			"Fishing": 			{"Hardware": 0.35, 	"RealEstate": 0.15, "Robots": 0.5, 	"AICores": 0.2},
			"Mining": 			{"Hardware": 0.4, 	"RealEstate": 0.3, 	"Robots": 0.45, "AICores": 0.45},
			"Food": 			{"Hardware": 0.15, 	"RealEstate": 0.05, "Robots": 0.3, 	"AICores": 0.25},
			"Tobacco": 			{"Hardware": 0.15, 	"RealEstate": 0.15, "Robots": 0.2, 	"AICores": 0.15},
			"Chemical": 		{"Hardware": 0.2, 	"RealEstate": 0.25, "Robots": 0.25, "AICores": 0.2},
			"Pharmaceutical": 	{"Hardware": 0.15, 	"RealEstate": 0.05, "Robots": 0.25, "AICores": 0.2},
			"Computer": 		{"Hardware": 0., 	"RealEstate": 0.2, 	"Robots": 0.36, "AICores": 0.19},
			"Robotics": 		{"Hardware": 0.19, 	"RealEstate": 0.32, "Robots": 0., 	"AICores": 0.36},
			"Software": 		{"Hardware": 0.25, 	"RealEstate": 0.15, "Robots": 0.05, "AICores": 0.18},
			"Healthcare": 		{"Hardware": 0.1, 	"RealEstate": 0.1, 	"Robots": 0.1, 	"AICores": 0.1},
			"Real Estate": 		{"Hardware": 0.05, 	"RealEstate": 0., 	"Robots": 0.6, 	"AICores": 0.6},
		};
		const matSizes = { "Hardware": 0.06, "RealEstate": 0.005, "Robots": 0.5, "AICores": 0.1 };
		
		const beta = 0.002;			// constant multiplier used in production factor calculation
		const epsilon = 1e-12;		
		let alpha = matProdFactors[divisionType];	

		var storage = { "Hardware": -1., "RealEstate": -1., "Robots": -1., "AICores": -1. };
		let removedMats = [];		// if the optimal solution requires negative material storage, resolve without that material
		while (true) {
			let alphaSum = 0;		
			let gSum = 0;
			for (let mat in matSizes) {
				if (!removedMats.includes(mat)) {
					gSum += matSizes[mat];		// sum of material sizes
					alphaSum += alpha[mat];		// sum of material material "production factors"
				}
			}
			for (let mat in matSizes) {
				if (!removedMats.includes(mat)) {
					// solution of the constrained optimiztion problem via the method of Lagrange multipliers
					storage[mat] = 1./beta*(alpha[mat]/alphaSum*(beta*size + gSum)/matSizes[mat] - 1.);
				}
			}
		
			if (storage["Hardware"] >= -epsilon && storage["RealEstate"] >= -epsilon && storage["Robots"] >= -epsilon && storage["AICores"] >= -epsilon) {
				break;
			} else { // negative solutions are possible, remove corresponding material and resolve
				if (storage["Hardware"] < -epsilon) 	{ storage["Hardware"] = 0., 	removedMats.push("Hardware"); continue; }
				if (storage["RealEstate"] < -epsilon) 	{ storage["RealEstate"] = 0., 	removedMats.push("RealEstate"); continue; }
				if (storage["Robots"] < -epsilon) 		{ storage["Robots"] = 0., 		removedMats.push("Robots"); continue; }
				if (storage["AICores"] < -epsilon) 		{ storage["AICores"] = 0., 		removedMats.push("AICores"); continue; }
			}
		}
		return storage;		
	}
}