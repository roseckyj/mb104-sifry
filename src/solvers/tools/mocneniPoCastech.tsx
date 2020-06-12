import React from 'react';
import { soustavaKongruenci } from './soustavaKongruenci';

export function mocneniPoCastech(base: number, exponent: number, p: number, q: number, varName: string) {
    let steps: JSX.Element[] = [];

    const p1 = Math.pow((base % p + p) % p, (exponent % (p - 1) + p - 1) % (p - 1)) % p;
    const q1 = Math.pow((base % q + q) % q, (exponent % (q - 1) + q - 1) % (q - 1)) % q;

    steps.push(
        <p>
            Mocniny spočítáme zvlášť modulo {p} a {q}.
        </p>,
    );

    steps.push(
        <p>
            {varName} ≡ {base}^{exponent} ≡ {base % p}^{exponent % (p - 1)} ≡ {p1} (mod {p})
        </p>,
    );
    steps.push(
        <p>
            {varName} ≡ {base}^{exponent} ≡ {base % q}^{exponent % (q - 1)} ≡ {q1} (mod {q})
        </p>,
    );

    steps.push(
        <p>
            Nyní dáme tyto dva mezivýsledky, {varName} ≡ {p1} mod {p}, {varName} ≡ {q1} mod {q}, dohromady modulo{' '}
            {p * q}
        </p>,
    );
    const soustavaRes = soustavaKongruenci(p1, p, q1, q, varName);
    steps.push(soustavaRes.steps);

    return {
        steps: (
            <>
                <hr />
                {steps}
                <hr />
            </>
        ),
        result: soustavaRes.result,
    };
}

export function mocneniPostupne(base: number, exponent: number, mod: number) {
    let steps: JSX.Element[] = [];

    steps.push(
        <p>
            ≡ 1 · {base}^{exponent}
        </p>,
    );

    let left = 1;

    while (exponent != 1) {
        if (exponent % 2 == 0) {
            steps.push(
                <p>
                    ≡ {left} · ({base}^2)^{exponent / 2} ≡ {left % mod} · ({(base * base) % mod}
                    )^{exponent / 2}
                </p>,
            );
            exponent = exponent / 2;
            base = (base * base) % mod;
            left = left % mod;
        } else {
            steps.push(
                <p>
                    ≡ {left} · {base} · ({base}^2)^{(exponent - 1) / 2} ≡ {(left * base) % mod} · ({(base * base) % mod}
                    )^{(exponent - 1) / 2}
                </p>,
            );
            left = (left * base) % mod;
            exponent = (exponent - 1) / 2;
            base = (base * base) % mod;
        }
    }

    steps.push(<p>≡ {(left * base) % mod}</p>);

    return {
        steps: (
            <>
                <hr />
                {steps}
                <hr />
            </>
        ),
        result: (left * base) % mod,
    };
}
