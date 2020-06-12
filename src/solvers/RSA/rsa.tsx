import React from 'react';
import { mocneniPoCastech } from '../tools/mocneniPoCastech';
import { kongruence } from '../tools/kongruence';

export function rsa_encode(e: number, p: number, q: number, m: number) {
    const mocneni = mocneniPoCastech(m, e, p, q, 'c');

    return {
        steps: (
            <>
                <p>
                    Máme n = p × q = {p * q}, e = {e} a m ≡ {m} (mod {p * q}).
                </p>
                <p>
                    Zašifrovaná zpráva pak je c ≡ {m}^{e} (mod {p * q}).
                </p>
                <p>{mocneni.steps}</p>
                <p>
                    Zašifrovaná zpráva je tedy c ≡ {mocneni.result} (mod {p * q})
                </p>
            </>
        ),
        result: null,
    };
}

export function rsa_decode(e: number, p: number, q: number, c: number) {
    const soukromy = kongruence(e, 1, (p - 1) * (q - 1), 'd');
    if (!soukromy.result) {
        return {
            steps: (
                <>
                    <p>
                        K veřejnému klíči e = {e} potřebujeme najít soukromý klíč d, tj. inverzi modulo φ({p}×{q}) ={' '}
                        {p - 1}×{q - 1} = {(p - 1) * (q - 1)}:
                    </p>
                    {soukromy.steps}
                </>
            ),
            result: null,
        };
    }

    const mocneni = mocneniPoCastech(c, soukromy.result, p, q, 'c');

    return {
        steps: (
            <>
                <p>
                    K veřejnému klíči e = {e} potřebujeme najít soukromý klíč d, tj. inverzi modulo φ({p}×{q}) = {p - 1}
                    ×{q - 1} = {(p - 1) * (q - 1)}:
                </p>
                {soukromy.steps}
                <p>
                    Dešifrovaná zpráva pak je m ≡ {c}^{soukromy.result} (mod {p * q}).
                </p>
                {mocneni.steps}
                <p>
                    Dešifrovaná zpráva je tedy m ≡ {mocneni.result} (mod {p * q})
                </p>
            </>
        ),
        result: null,
    };
}
