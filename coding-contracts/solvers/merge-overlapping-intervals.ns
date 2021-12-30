export function solve(ns, data) {
    // eg. [[19,23],[25,34],[7,8],[7,15],[18,28],[5,6],[1,8],[9,13]]
    // eg. [[2,4],[17,18],[25,28],[4,13],[14,15],[13,15],[4,10],[4,7],[3,8]]
    let ranges = new Set();

    for (let newRange of data) {
        for (let range of ranges) {
            if (overlaps(newRange, range)) {
                ranges.delete(range);
                newRange = merge(newRange, range);
            }
        }
        ranges.add(newRange);
    }

    let solution = [];
    for (let range of ranges)
        solution.push(range);

    solution.sort((range1, range2) => {
        if (range1[0] < range2[0])
            return -1;
        else if (range1[0] == range2[0])
            throw new Error(sprintf("Bad ranges: %s %s", JSON.stringify(range1), JSON.stringify(range2)));
        else
            return 1;
    });

    return solution;
}

function overlaps(range1, range2) {
    //   ***
    // ***
    if (range1[0] >= range2[0] && range1[0] <= range2[1])
        return true;

    // ***
    //   ***
    if (range1[1] >= range2[0] && range1[1] <= range2[1])
        return true;

    // *****
    //  ***
    if (range1[0] <= range2[0] && range1[1] >= range2[1])
        return true;

    // no overlap
    return false;
}

function merge(range1, range2) {
    return [Math.min(range1[0], range2[0]), Math.max(range1[1], range2[1])];
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solve(ns, data))));
}