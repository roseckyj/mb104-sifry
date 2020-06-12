export function generateMatrix(width: number, height: number, polynomOrig: boolean[]) {
    let polynom = Array.from(polynomOrig);
    let matrixCols: boolean[][] = [];

    matrixCols.push(polynomToFixedLength(polynom, height));

    for (let x = 1; x < width; x++) {
        polynom.unshift(false);
        if (polynom[height - width]) {
            polynom = polynomXor(polynom, matrixCols[0], height);
        }
        matrixCols.push(polynomToFixedLength(polynom, height));
    }

    return matrixCols;
}

export function polynomToFixedLength(polynom: boolean[], length: number) {
    let res: boolean[] = [];

    for (let i = 0; i < length; i++) {
        if (polynom[i]) {
            res.push(polynom[i]);
        } else {
            res.push(false);
        }
    }

    return res;
}

export function polynomXor(polynom1: boolean[], polynom2: boolean[], length: number): boolean[] {
    let res: boolean[] = [];

    for (let i = 0; i < length; i++) {
        let x = false;
        let y = false;
        if (polynom1[i]) {
            x = polynom1[i];
        }
        if (polynom2[i]) {
            y = polynom2[i];
        }
        res.push((x && !y) || (!x && y));
    }

    return res;
}

export function flipMatrix(matrix: boolean[][], width: number, height: number) {
    let res: boolean[][] = [];

    for (let y = 0; y < height; y++) {
        let row: boolean[] = [];

        for (let x = 0; x < width; x++) {
            row[x] = matrix[x][y];
        }

        res.push(row);
    }

    return res;
}
