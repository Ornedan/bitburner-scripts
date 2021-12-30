export function solve(ns, data) {
    // eg. [72,139,120,79,136,142,93,192,63,148,174,180,66,136,6,68,4,47,78,67,31,176] = 697
    let stocks = data;
    let maxProfit = 0;

    // This is actually OK because:
    // - Transaction longer than 1 day profit equally as transactions that
    //   buy on day N, sell on N+1 and buy again on N+1, sell again on N+2 ...
    //   This violates the non-overlapping transactions rule, except
    // - When the profit between days N and N+1 is negative, that effectively
    //   breaks the streak of transactions, so the rule violation doesn't change
    //   the result
    for(let day = 1; day < stocks.length; day++) {
        maxProfit += Math.max(0, stocks[day] - stocks[day - 1]);
    }
    
    /*
    genTransactions(stocks.length, transactions => {
        let profit = 0;
        for (let transaction of transactions) {
            profit += Math.max(0, stocks[transaction[1]] - stocks[transaction[0]]);
        }
        
        maxProfit = Math.max(maxProfit, profit);
    });*/
    
    return maxProfit;
}

// Note: The memory optimisation means yielded value is edited during successive
//       iterations, so make a copy if it needs to persist
function genTransactions(size, consumer) {
    let elements = new Array(size);
    for(let i = 0; i < elements.length; i++)
        elements[i] = [-1, -1];
   
    let transactions = [];
 
    function genTransactions1(pos, free) {
        if (pos == size) {
            consumer(transactions);
            return;
        }
 
        for (let i = pos; i < size; i++) {
            if (i == pos) { // Can't buy and sell on same day
                genTransactions1(i + 1, free);
            } else {
                elements[free][0] = pos;
                elements[free][1] = i;
                transactions.push(elements[free]);
                genTransactions1(i + 1, free + 1);
                transactions.pop();
            }
        }
    }
 
    genTransactions1(0, 0);
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}