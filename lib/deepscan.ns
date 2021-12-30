/** 
 * @param {NS} ns
 * @param {String[]} excludes may not include start
 * @param {String} start
 **/
export function getServerGraph(ns, excludes = [], start = "home") {
    const scans = {};

    function scanDFS(id) {
        let adjacents = ns.scan(id);
        adjacents.filter(id => !excludes.includes(id));
        adjacents.sort();

        scans[id] = {
            id: id,
            adjacents: adjacents
        };

        for (const adjacent of adjacents)
            if (scans[adjacent] == null)
                scanDFS(adjacent);
    }

    if (excludes.includes(start))
        throw new Error("Cannot exclude starting point")

    scanDFS(start);

    return scans;
}

export function pathTo(scans, start, destination) {
    let cameFrom = {};
    cameFrom[start] = start;

    function seek(node) {
        for (let adjacent of scans[node].adjacents) {
            if (cameFrom[adjacent] === undefined) {
                cameFrom[adjacent] = node;
                seek(adjacent);
            }
        }
    }

    seek(start);

    let steps = [];
    function trail(node) {
        steps.push(node);

        let prev = cameFrom[node];
        if (prev != start)
            trail(prev);
    }

    trail(destination);
    steps.reverse();

    return steps;
}