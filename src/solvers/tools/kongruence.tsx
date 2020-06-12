import React from 'react';

export function kongruence(left: number, right: number, mod: number, varName: string) {
    let res: { left: number; right: number }[] = [];

    res.push({ left: mod, right: 0 });
    left = left % mod;
    right = right % mod;
    res.push({ left, right });

    while (res[res.length - 1].left !== 0) {
        const pre1 = res[res.length - 1];
        const pre2 = res[res.length - 2];

        const mult = Math.floor(pre2.left / pre1.left);
        const newRow = {
            left: pre2.left - pre1.left * mult,
            right: (pre2.right - pre1.right * mult) % mod,
        };
        res.push(newRow);
    }

    console.log(res);

    return {
        steps: (
            <>
                <hr />
                <p>
                    Vyřešíme kongruenci {left}x ≡ {right} mod {mod}:
                </p>
                <br />
                {res.map((row) => (
                    <p>
                        {row.left}
                        {varName} ≡ {row.right}
                    </p>
                ))}
                <br />
                {res[res.length - 1].left === 0 && res[res.length - 1].right === 0 ? (
                    <p>
                        Tedy {varName} ≡ {res[res.length - 2].right} mod {mod}
                    </p>
                ) : (
                    <p>Tato kongruence nemá řešení, protože 0{varName} !≡ 0</p>
                )}
                <hr />
            </>
        ),
        result: res[res.length - 1].left === 0 && res[res.length - 1].right === 0 ? res[res.length - 2].right : null,
    };
}
