export function solve(ns, data) {
    // eg. "()())()" -> ["()()()", "(())()"]
    // eg. "(a)())()" -> ["(a)()()", "(a())()"]
    // eg. ")(" -> [""]

    function generate(string, consumer) {
        let work = string.split("");

        function generate1(pos) {
            if (pos == work.length) {
                consumer(work);
                return;
            }

            // With
            generate1(pos + 1);

            // Without
            if (work[pos] == '(' || work[pos] == ')') {
                let c = work[pos];
                work[pos] = '';
                generate1(pos + 1);
                work[pos] = c;
            }
        }
        
        generate1(0);
    }

    function balanced(candidate, consumer) {
        let score = 0;
        for (let i = 0; i < candidate.length; i++) {
            if (candidate[i] == '(')
                score += 1;
            if (candidate[i] == ')')
                score -= 1;

            if (score < 0) // Inner imbalance?
                return;
        }

        if (score == 0) // Balanced at end?
            consumer(candidate);
    }

    // Valid solutions
    let solutions = [];
    generate(data, candidate => balanced(candidate, solution => {
        solutions.push(solution.join(""));
    }));

    // Least removals
    let maxLength = solutions.reduce((foundMax, solution) => Math.max(foundMax, solution.length), 0);
    solutions = solutions.filter(solution => solution.length == maxLength);

    // Deduplicate
    solutions = Array.from(new Set(solutions));
    
    return solutions;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}