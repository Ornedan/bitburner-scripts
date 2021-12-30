export function solve(ns, data) {
    // eg. [5] = 1
    // eg. [0,7,8,10,0,0,5] = 0
    // eg. [9,7,8,10,6,7,8,2,6,0,0,0,2,1,8,5,0,0,0,0,7,8,6,0,0] = 1

    let jumps = data;
    let jumpable = new Array(jumps.length);

    jumpable.fill(0);
    jumpable[0] = 1;

    for (let pos = 0; pos < jumps.length; pos++) {
        if (!jumpable[pos])
            continue;

        for (let jump = pos, end = Math.min(jumps.length - 1, pos + jumps[pos]); jump <= end; jump++)
            jumpable[jump] = 1;
    }
    
    return jumpable[jumps.length - 1];
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}