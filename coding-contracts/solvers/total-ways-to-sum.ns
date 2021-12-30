export function solve(ns, data) {
    // eg. 34 = 12309

    /* http://oeis.org/A000041
    import Data.MemoCombinators (memo2, integral)

    a000041 n = a000041_list !! n
    a000041_list = map (p' 1) [0..]
      where p' = memo2 integral integral p
            p _ 0 = 1
            p k m = if m < k then 0 else p' k (m - k) + p' (k + 1) m
    */
    
    let memo = [];
    
    function ways(k, n) {
        if(memo[k] === undefined)
            memo[k] = [];
        
        if(memo[k][n] !== undefined)
            return memo[k][n];
        
        let v;
        if(n == 0) {
            v = 1;
        }
        else if(k > n) {
            v = 0;
        }
        else {
            v = ways(k, n - k) + ways(k + 1, n);
        }
        
        memo[k][n] = v;
        return v;
    }
    
    // -1 to discard the "undivided" partition
    return ways(1, data) - 1;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}