import React from 'react';
import { Input } from '../tools/input';

export type IPrimitiveRootState = {
    p: number;
    e: number;
    steps: JSX.Element;
};

export class PrimitiveRoot extends React.Component<{}, IPrimitiveRootState> {
    state: IPrimitiveRootState = {
        p: 0,
        e: 0,
        steps: <></>,
    };

    update() {
        this.setState({ steps: primitiveRoot(this.state.p, this.state.e).steps });
    }

    render() {
        return (
            <>
                <Input
                    label="n (číslo) = "
                    onChange={(value) => {
                        this.setState({ p: value, e: value - 1 });
                    }}
                    value={this.state.p}
                />
                <Input
                    label="φ(n) (eulerova funkce n) = "
                    onChange={(value) => {
                        this.setState({ e: value });
                    }}
                    value={this.state.e}
                />

                <button type="button" className="btn btn-primary" onClick={() => this.update()}>
                    Vypočítej!
                </button>
                <hr />
                {this.state.steps}
            </>
        );
    }
}

function primitiveRoot(p: number, euler: number) {
    const decomposition = primeDecomposition(euler);
    let steps: JSX.Element[] = [];
    let root = 0;
    let int = 2;
    while (root === 0) {
        steps.push(<hr />, <p>a ≡ {int}:</p>);
        const isPrimitiveRoot = decompositionToPrimes(decomposition)
            .map((prime, index) => {
                const ceil = euler / prime;
                const res = checkPrimitiveRoot(int, ceil, p);
                if (index === 0) {
                    res.powers.forEach((pow, i) => {
                        steps.push(
                            <p>
                                {int}^{Math.pow(2, i)} ≡ {pow}
                            </p>,
                        );
                    });
                }
                steps.push(
                    <br />,
                    <p>
                        Zkontrolujeme, jestli {int}^{ceil} !≡ 0:
                    </p>,
                );
                steps.push(
                    <p>
                        {int}^{ceil} ≡ {res.used.map((pow) => int + '^' + pow).join(' · ')} ≡ {res.result}
                    </p>,
                );
                return res.result !== 1;
            })
            .reduce((prev, curr) => prev && curr, true);

        if (isPrimitiveRoot) {
            root = int;
        } else {
            steps.push(
                <br />,
                <p>
                    {int} není primitivním kořenem mod {p}.
                </p>,
            );
        }
        int++;
    }

    return {
        steps: (
            <>
                <p>
                    Najdeme φ({p}) = {euler}.
                </p>
                <p>
                    Hledáme číslo a řádu {euler}. Podle Eulerovy věty a^{euler} ≡ 1, budeme kontrolovat, zda{' '}
                    {decompositionToPrimes(decomposition)
                        .map((prime) => 'a^' + (euler / prime).toString() + ' !≡ 1')
                        .join(', ')}
                    .
                </p>
                <p>
                    Protože a ≡ 1 má řád 1, začneme s a ≡ 2 a budeme iterovat, dokud nenajdeme nějaký primitivní kořen:
                </p>
                {steps}
                <br />
                <p>
                    Primitivním kořenem mod {p} je číslo a = {root}
                </p>
                <hr />
                <p>Všechny primitivní kořeny jsou a^n, kde n je nesoudělné s {euler}:</p>
                <p>
                    {allPrimitiveRoots(p, euler)
                        .map((pow) => 'a^' + pow)
                        .join(', ')}
                </p>
            </>
        ),
        result: null,
    };
}

function primeDecomposition(p: number) {
    let number = 2;
    let result: number[] = [];
    while (p != 1) {
        while (p % number === 0) {
            if (result[number]) {
                result[number]++;
            } else {
                result[number] = 1;
            }
            p = p / number;
        }
        number++;
    }
    return result;
}

function decompositionToPrimes(decomposition: number[]) {
    return Object.keys(decomposition).map((str) => parseInt(str));
}

function checkPrimitiveRoot(int: number, ceil: number, mod: number) {
    let pows: number[] = [];
    pows.push(int);
    let pow = 2;

    while (pow <= ceil) {
        pows.push((pows[pows.length - 1] * pows[pows.length - 1]) % mod);
        pow *= 2;
    }
    pow /= 2;

    let n = 0;
    let res = 1;
    let used: number[] = [];

    for (let i = pows.length - 1; i >= 0; i--) {
        if (n + pow <= ceil) {
            n += pow;
            res *= pows[i];
            res = res % mod;
            used.push(pow);
        }
        pow /= 2;
    }

    return {
        result: res,
        powers: pows,
        used,
    };
}

function allPrimitiveRoots(mod: number, euler: number) {
    let res: number[] = [];
    res.push(1);
    const factor = decompositionToPrimes(primeDecomposition(euler));
    for (let i = 2; i < euler; i++) {
        const f2 = decompositionToPrimes(primeDecomposition(i));
        if (factor.filter((value) => -1 !== f2.indexOf(value)).length === 0) {
            res.push(i);
        }
    }

    return res;
}
