export function solve(ns, data) {
    // eg. [1, 2] = 1
    // eg. [2, 1] = 1
    // eg. [7,13] = 18564
    let grid = new Array(data[1]);
    for (let i = 0; i < data[1]; i++)
        grid[i] = new Array(data[0]);

    for (let x = 0; x < grid[0].length; x++) {
        for (let y = 0; y < grid.length; y++) {
            // Edges only have one path to them
            if (x == 0 || y == 0) {
                grid[y][x] = 1;
            }
            else {
                grid[y][x] = grid[y][x - 1] + grid[y - 1][x];
            }
        }
    }
    
    return grid[data[1] - 1][data[0] - 1];
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}