import React from 'react';

export function soustavaKongruenci(r1: number, mod1: number, r2: number, mod2: number, varName: string) {
    let res: { left: number; r1: number; r2: number }[] = [];

    // mod1 must be bigger
    if (mod2 > mod1) {
        const p1 = mod2;
        mod2 = mod1;
        mod1 = p1;
        const p2 = r2;
        r2 = r1;
        r1 = p2;
    }

    res.push({ left: mod1, r1: r2, r2: 0 });
    res.push({ left: mod2, r1: 0, r2: r1 });

    while (res[res.length - 1].left !== 1) {
        const pre1 = res[res.length - 1];
        const pre2 = res[res.length - 2];

        const mult = Math.floor(pre2.left / pre1.left);
        const newRow = {
            left: pre2.left - pre1.left * mult,
            r1: (pre2.r1 - pre1.r1 * mult) % mod2,
            r2: (pre2.r2 - pre1.r2 * mult) % mod1,
        };
        res.push(newRow);
    }

    return {
        steps: (
            <>
                <hr />
                <p>Vyřešíme soustavu kongruencí:</p>
                <br />
                {res.map((row) => (
                    <p>
                        {row.left}
                        {varName} ≡ {row.r1}·{mod1} + {row.r2}·{mod2}
                    </p>
                ))}
                <br />
                <p>
                    Tedy {varName} ≡ {(res[res.length - 1].r1 * mod1 + res[res.length - 1].r2 * mod2) % (mod1 * mod2)}{' '}
                    mod {mod1 * mod2}
                </p>
                <hr />
            </>
        ),
        result: (res[res.length - 1].r1 * mod1 + res[res.length - 1].r2 * mod2) % (mod1 * mod2),
        noSum: [res[res.length - 1].r1 * mod1, res[res.length - 1].r2 * mod2],
    };
}
