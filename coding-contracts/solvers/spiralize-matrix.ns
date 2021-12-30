export function solve(ns, data) {
    // eg. [[1, 2 , 3 , 4 ]
    //     ,[5, 6 , 7 , 8 ]
    //     ,[9, 10, 11, 12]]
    // -> [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
    let matrix = data;
    let solution = [];
    
    while(matrix.length > 0) {
        for(let i = 0; i < matrix[0].length; i++)
            solution.push(matrix[0][i]);
        
        matrix.shift();
        matrix = rotate(matrix);
    }

    return solution;
}

function rotate(matrix0) {
    if(matrix0.length == 0 || matrix0[0].length == 0)
        return [];
    
    let matrix = new Array(matrix0[0].length);
    for (let mi = 0; mi < matrix.length; mi++)
        matrix[mi] = new Array(matrix0.length);

    for (let mi = 0; mi < matrix.length; mi++) {
        for (let ni = 0; ni < matrix[mi].length; ni++)
            matrix[mi][ni] = matrix0[ni][mi];
    }
    matrix.reverse();

    return matrix;
}

export async function main(ns) {
    let data = JSON.parse(ns.args[0]);
    let solution = solve(ns, data);
    ns.tprint(sprintf("Solution for %s = %s", ns.args[0], JSON.stringify(solution)));
}