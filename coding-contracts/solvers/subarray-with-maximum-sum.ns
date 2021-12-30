export function solve(ns, data) {
    // eg. [10,2,10,9,-6,7,0,-7,8,0,-1] = 33
    let maxSum = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < data.length; i++) {
        let sum = data[i];
        
        maxSum = Math.max(maxSum, sum); // Just the one
        
        for (let j = i + 1; j < data.length; j++) {
            sum += data[j];
            maxSum = Math.max(maxSum, sum); // Sum of i to j
        }
    }
    
    return maxSum;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}