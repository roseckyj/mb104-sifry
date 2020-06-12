import React from 'react';
import { Input } from '../tools/input';
import { diffeHellman } from '../DiffieHellman/encode';
import { kongruence } from '../tools/kongruence';
import { mocneniPoCastech } from '../tools/mocneniPoCastech';
import { soustavaKongruenci } from '../tools/soustavaKongruenci';

export type IRabin_decodeState = {
    p: number;
    q: number;
    c: number;
    steps: JSX.Element;
};

export class Rabin_decode extends React.Component<{}, IRabin_decodeState> {
    state: IRabin_decodeState = {
        p: 0,
        q: 0,
        c: 0,
        steps: <></>,
    };

    update() {
        this.setState({
            steps: rabin_decode(this.state.p, this.state.q, this.state.c).steps,
        });
    }

    render() {
        return (
            <>
                <Input
                    label="p (prvočíslo) = "
                    onChange={(value) => {
                        this.setState({ p: value });
                    }}
                    value={this.state.p}
                />
                <Input
                    label="q (prvočíslo) = "
                    onChange={(value) => {
                        this.setState({ q: value });
                    }}
                    value={this.state.q}
                />
                <Input
                    label="c (zašifrovaná zpráva) = "
                    onChange={(value) => {
                        this.setState({ c: value });
                    }}
                    value={this.state.c}
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

export function rabin_decode(p: number, q: number, c: number) {
    const p1 = Math.pow(c % p, ((p + 1) / 4) % (p - 1)) % p;
    const q1 = Math.pow(c % q, ((q + 1) / 4) % (q - 1)) % q;

    const soustavaRes = soustavaKongruenci(p1, p, q1, q, 'm');

    return {
        steps: (
            <>
                <p>
                    Pro dešifrování zprávy potřebujeme zjistit sqrt({c}) (mod {p * q})$.
                </p>
                <p>
                    Známe faktorizaci veřejného klíče, spočítáme tedy zvlášť modulo {p} a {q}.
                </p>
                <p>Obecně odmocninu z c (mod p) lze spočítat, jako ± c^((p+1)/(4)).</p>
                <p>
                    m ≡ ±{c}^(({p}+1)/(4)) ≡ ±{c}^{(p + 1) / 4} ≡ ±{c % p}^{((p + 1) / 4) % (p - 1)} ≡ ±{p1} (mod {p})
                </p>
                <p>
                    m ≡ ±{c}^(({q}+1)/(4)) ≡ ±{c}^{(q + 1) / 4} ≡ ±{c % q}^{((q + 1) / 4) % (q - 1)} ≡ ±{q1} (mod {q})
                </p>
                <p>
                    Nyní dáme tyto dva mezivýsledky, m ≡ {p1} mod {p}, m ≡ {q1} mod {q}, dohromady modulo {p * q}
                </p>
                {soustavaRes.steps}
                <p>Nyní můžeme nahradit znaménka za ± a dopočítat 4 možné výsledky:</p>
                <p>
                    m ≡ ± {Math.abs(soustavaRes.noSum[0])} ± {Math.abs(soustavaRes.noSum[1])}
                </p>
                <p>
                    m ≡ ± {Math.abs(soustavaRes.noSum[0] + soustavaRes.noSum[1])} ≡ ±{' '}
                    {Math.abs(soustavaRes.noSum[0] + soustavaRes.noSum[1]) % (p * q)} (mod {p * q})
                </p>
                <p>
                    m ≡ ± {Math.abs(soustavaRes.noSum[0] - soustavaRes.noSum[1])} ≡ ±{' '}
                    {Math.abs(soustavaRes.noSum[0] - soustavaRes.noSum[1]) % (p * q)} (mod {p * q})
                </p>
            </>
        ),
        result: null,
    };
}
