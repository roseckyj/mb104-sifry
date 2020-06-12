import { polynomXor, polynomToFixedLength } from './generateMatrix';

export function encodeWithPolynom(width: number, height: number, matrix: boolean[][], input: boolean[]) {
    let res: boolean[] = [];

    for (let i = 0; i < width; i++) {
        if (input[i]) {
            res = polynomXor(res, matrix[i], height);
        }
    }

    return polynomToFixedLength(res, height);
}
