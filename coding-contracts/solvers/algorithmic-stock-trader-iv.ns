export function solve(ns, data) {
    // eg. [4,[99]] = 0
    // eg. [6,[188,115,105,43,91,8,53,193,5,175,107,6,90,189,142,13,168,123,161,191,182,103,135,47,107,102,57,111,59,81,187,40,122,169,3,28,148,154]] = 1007
    let maxTransactions = data[0];
    let stocks = data[1];

    // +1 so `sells[0] = 0` always => `buys[1] = -price` after every round
    let buys = new Array(maxTransactions + 1);
    let sells = new Array(maxTransactions + 1);
    for (let i = 0; i <= maxTransactions; i++) {
        buys[i] = Number.MIN_SAFE_INTEGER;
        sells[i] = 0;
    }

    for (let price of stocks) {
        // Transaction N sees yesterday's data from N-1
        for (let trans = maxTransactions; trans > 0; trans--) {
            sells[trans] = Math.max(sells[trans], buys[trans] + price);
            buys[trans] = Math.max(buys[trans], sells[trans - 1] - price);
        }
    }
    
    return sells[maxTransactions];
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}