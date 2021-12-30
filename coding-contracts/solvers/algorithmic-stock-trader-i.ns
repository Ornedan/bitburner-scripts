export function solve(ns, data) {
    // eg. [174,186,142,114,141,103,122]
    let maxProfit = 0;

    for (let buyDay = 0; buyDay < data.length - 1; buyDay++) {
        for (let sellDay = buyDay + 1; sellDay < data.length; sellDay++) {
            let profit = data[sellDay] - data[buyDay];
            maxProfit = Math.max(maxProfit, profit);
        }
    }

    return maxProfit;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    ns.tprint(sprintf("Solution for %s = %d", ns.args[0], solve(ns, data)));
}