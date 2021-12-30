export function solve(ns, data) {
    // eg. "25525511135" = ["255.255.11.135","255.255.111.35"]
    // eg. "1938718066"  = ["193.87.180.66"]
    // eg. "24613511239" = ["246.135.11.239","246.135.112.39"]
    let numbers = data;
    let addresses = [];

    let segments = [];

    function generate(pos) {
        if (segments.length == 4) {
            if (pos == numbers.length)
                addresses.push(segments.join("."));
            return;
        }

        for (let i = pos, end = Math.min(numbers.length, pos + 3); i < end; i++) {
            let segment = numbers.substring(pos, i + 1);

            if ((segment.startsWith("0") && segment.length > 1) || parseInt(segment) > 255)
                return;

            segments.push(segment);
            generate(i + 1);
            segments.pop();
        }
    }

    generate(0);

    return addresses;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}