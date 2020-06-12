import React from 'react';
import { Input } from '../tools/input';
import { diffeHellman } from '../DiffieHellman/encode';
import { kongruence } from '../tools/kongruence';
import { mocneniPoCastech } from '../tools/mocneniPoCastech';
import { soustavaKongruenci } from '../tools/soustavaKongruenci';

export type IRabin_encodeState = {
    p: number;
    q: number;
    m: number;
    steps: JSX.Element;
};

export class Rabin_encode extends React.Component<{}, IRabin_encodeState> {
    state: IRabin_encodeState = {
        p: 0,
        q: 0,
        m: 0,
        steps: <></>,
    };

    update() {
        this.setState({
            steps: rabin_encode(this.state.p, this.state.q, this.state.m).steps,
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
                    label="m (zpráva) = "
                    onChange={(value) => {
                        this.setState({ m: value });
                    }}
                    value={this.state.m}
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

export function rabin_encode(p: number, q: number, m: number) {
    const mocnina = mocneniPoCastech(m, 2, p, q, 'c');

    return {
        steps: (
            <>
                <p>Pro zašifrování zprávy potřebujeme umocnit m^2.</p>
                {mocnina.steps}
                <p>
                    Zašifrovaná zpráva je tedy {(mocnina.result + p * q) % (p * q)} (mod {p * q})
                </p>
            </>
        ),
        result: null,
    };
}
