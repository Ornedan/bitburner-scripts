export function solve(ns, data) {
    // eg. 947665022

    // Primes up to sqrt(N). If N itself isn't prime then at least one
    // of these is a factor.
    let primes = primesUpTo(Math.ceil(Math.sqrt(data)));

    let factor = data;
    scanloop: while (true) {
        for (let prime of primes) {
            if (factor % prime === 0 && factor !== prime) {
                factor = Math.round(factor / prime);
                continue scanloop;
            }
        }
        break;
    }

    return factor; // Itself a prime number
}

function primesUpTo(n) {
    let primes = [2];
    primeloop: for (let i = 3; i <= n; i++) {
        for (let prime of primes)
            if (i % prime == 0)
                continue primeloop;
        primes.push(i);
    }

    return primes;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    ns.tprint(sprintf("Solution for %s = %d", ns.args[0], solve(ns, data)));
}