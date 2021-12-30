export function solve(ns, data) {
    // eg. [[0,0],[0,0],[0,0]]
    // -> 3
    // eg. [[0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0]]
    // -> 3
    // eg. [[0,0,0,0,0],[0,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,0],[0,0,0,0,1],[0,0,1,0,0],[0,0,0,0,0],[0,0,1,0,0]]
    // -> 164
    let course = data;
    let grid = new Array(course.length);
    for (let i = 0; i < course.length; i++)
        grid[i] = new Array(course[i].length);

    for (let x = 0; x < grid[0].length; x++) {
        for (let y = 0; y < grid.length; y++) {
            if (course[y][x] == 1) { // Blocked
                grid[y][x] = 0;
            } else if (x == 0 && y == 0) { // Start
                grid[y][x] = 1;
            } else { // From above and left
                let above = (y - 1) >= 0 ? grid[y - 1][x] : 0;
                let left = (x - 1) >= 0 ? grid[y][x - 1] : 0;

                grid[y][x] = above + left;
            }
        }
    }

    // ns.tprint(JSON.stringify(grid));

    return grid[grid.length - 1][grid[0].length - 1];
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}