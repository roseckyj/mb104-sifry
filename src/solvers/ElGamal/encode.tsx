import React from 'react';
import { Input } from '../tools/input';
import { diffeHellman } from '../DiffieHellman/encode';

export type IElGamal_encodeState = {
    p: number;
    g: number;
    a: number;
    gb: number;
    m: number;
    steps: JSX.Element;
};

export class ElGamal_encode extends React.Component<{}, IElGamal_encodeState> {
    state: IElGamal_encodeState = {
        p: 0,
        g: 0,
        a: 0,
        gb: 0,
        m: 0,
        steps: <></>,
    };

    update() {
        this.setState({
            steps: elGamal_encode(this.state.p, this.state.g, this.state.a, this.state.gb, this.state.m).steps,
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

export function elGamal_encode(p: number, g: number, a: number, gb: number, m: number) {
    const privateKey = diffeHellman(p, g, a, gb);

    return {
        steps: (
            <>
                <p>Nejprve spočítáme společnou část soukromého klíče pomocí protokolu Diffie-Hellman</p>
                {privateKey.steps}
                <p>
                    Zprávu zašifrujeme, jako součin c ≡ {privateKey.result} · {m} (mod {p})
                </p>
                <p>
                    c ≡ {(privateKey.result * m) % p} (mod {p})
                </p>
            </>
        ),
        result: (privateKey.result * m) % p,
    };
}
