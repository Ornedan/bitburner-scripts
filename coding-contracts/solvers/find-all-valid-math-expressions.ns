export function solve(ns, data) {
    // eg. ["669853456348",51]
    // eg. ["915951421169",-7]
    let numbers = data[0];
    let target = data[1];
    let solutions = [];
    
    genTokens(numbers, tokens => {
       genSolutions(target, tokens, solution => {
           solutions.push(solution);
       });
    });

    return solutions;
}

function genTokens(str, consumer) {
    let tokens = [];

    function genTokens1(pos) {
        if (pos == str.length) {
            consumer(tokens);
            return;
        }

        for (let i = pos; i < str.length; i++) {
            if (i != pos && str[pos] == '0') // No leading zeros in the numbers
                return;

            tokens.push(parseInt(str.substring(pos, i + 1)));
            genTokens1(i + 1);
            tokens.pop();
        }
    }

    genTokens1(0);
}

function genSolutions(target, tokens, action) {
    let path = new Array(tokens.length * 2 - 1);
    for (let i = 0; i < tokens.length; i++)
        path[i * 2] = tokens[i];

    function genSolutions1(i, value, multAdjust) {
        if (i == tokens.length) {
            if (value == target)
                action(path.join(""));
            return;
        }

        path[i * 2 - 1] = "+";
        genSolutions1(i + 1, value + tokens[i], tokens[i]);

        path[i * 2 - 1] = "-";
        genSolutions1(i + 1, value - tokens[i], -tokens[i]);

        path[i * 2 - 1] = "*";
        genSolutions1(i + 1, value - multAdjust + multAdjust * tokens[i], multAdjust * tokens[i]);
    }

    genSolutions1(1, tokens[0], tokens[0]);
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    const start = performance.now();
    let solution = solve(ns, data);
    const end = performance.now();
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
    ns.tprint(sprintf("Took %d msec", end - start));
}