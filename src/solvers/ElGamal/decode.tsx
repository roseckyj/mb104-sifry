import React from 'react';
import { Input } from '../tools/input';
import { mocneniPostupne } from '../tools/mocneniPoCastech';
import { diffeHellman } from '../DiffieHellman/encode';
import { kongruence } from '../tools/kongruence';

export type IElGamal_decodeState = {
    p: number;
    g: number;
    a: number;
    gb: number;
    c: number;
    steps: JSX.Element;
};

export class ElGamal_decode extends React.Component<{}, IElGamal_decodeState> {
    state: IElGamal_decodeState = {
        p: 0,
        g: 0,
        a: 0,
        gb: 0,
        c: 0,
        steps: <></>,
    };

    update() {
        this.setState({
            steps: elGamal_decode(this.state.p, this.state.g, this.state.a, this.state.gb, this.state.c).steps,
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
                    label="g (primitivní kořen) = "
                    onChange={(value) => {
                        this.setState({ g: value });
                    }}
                    value={this.state.g}
                />
                <Input
                    label="a (soukromý klíč 1) = "
                    onChange={(value) => {
                        this.setState({ a: value });
                    }}
                    value={this.state.a}
                />
                <Input
                    label="g^b (šifrovaný soukromý klíč) = "
                    onChange={(value) => {
                        this.setState({ gb: value });
                    }}
                    value={this.state.gb}
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

export function elGamal_decode(p: number, g: number, a: number, gb: number, c: number) {
    const privateKey = diffeHellman(p, g, a, gb);
    const congruency = kongruence(privateKey.result, c, p, 'm');

    return {
        steps: (
            <>
                <p>Nejprve spočítáme společnou část soukromého klíče pomocí protokolu Diffie-Hellman</p>
                {privateKey.steps}
                <p>
                    Zprávu rozšifrujeme, jako kongruenci {c} ≡ c ≡ g^ab · m ≡ {privateKey.result} · m (mod {p}).
                </p>
                {congruency.steps}
                <p>
                    Odeslaná zpráva tedy byla m ≡ {congruency.result} (mod {p})
                </p>
            </>
        ),
        result: null,
    };
}
