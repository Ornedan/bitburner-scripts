export function solve(ns, data) {
    // Example: If you are given the following triangle:
    //
    //[
    //     [2],
    //    [3,4],
    //   [6,5,7],
    //  [4,1,8,3]
    //]
    // 
    // The minimum path sum is 11 (2 -> 3 -> 5 -> 1).

    // [[2],[3,4],[6,5,7],[4,1,8,3]]

    let triangle = data;
    let paths = new Array(triangle.length);
    for (let y = 0; y < triangle.length; y++)
        paths[y] = new Array(triangle[y].length);

    paths[0][0] = triangle[0][0];

    for (let y = 1; y < triangle.length; y++) {
        for (let x = 0; x < triangle[y].length; x++) {
            let upleft = paths[y - 1][x - 1];
            if (upleft === undefined)
                upleft = Number.MAX_SAFE_INTEGER;

            let upright = paths[y - 1][x];
            if (upright === undefined)
                upright = Number.MAX_SAFE_INTEGER;

            paths[y][x] = triangle[y][x] + Math.min(upleft, upright);
        }
    }

    //for (let y = 0; y < triangle.length; y++)
    //    ns.tprint(JSON.stringify(paths[y]));

    let solution = Math.min(...paths[triangle.length - 1]);

    return solution;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}