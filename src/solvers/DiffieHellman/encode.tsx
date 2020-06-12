import React from 'react';
import { Input } from '../tools/input';
import { mocneniPostupne } from '../tools/mocneniPoCastech';

export type IDiffieHellmanState = {
    p: number;
    g: number;
    a: number;
    gb: number;
    steps: JSX.Element;
};

export class DiffieHellman extends React.Component<{}, IDiffieHellmanState> {
    state: IDiffieHellmanState = {
        p: 0,
        g: 0,
        a: 0,
        gb: 0,
        steps: <></>,
    };

    update() {
        this.setState({ steps: diffeHellman(this.state.p, this.state.g, this.state.a, this.state.gb).steps });
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
                <button type="button" className="btn btn-primary" onClick={() => this.update()}>
                    Vypočítej!
                </button>
                <hr />
                {this.state.steps}
            </>
        );
    }
}

export function diffeHellman(p: number, g: number, a: number, gb: number) {
    const privateKey = mocneniPostupne(gb, a, p);

    return {
        steps: (
            <>
                <p>Alice získala Bobovu část klíče, jako g^n = {gb}.</p>
                <p>Alice vypočítá a pošle svou část soukromého klíče:</p>
                {mocneniPostupne(g, a, p).steps}
                <p>Společný soukromý klíč nyní vypočítá, jako (g^b)^a</p>
                {privateKey.steps}
                <p>
                    Společný soukromý klíč je tedy g^ab ≡ {privateKey.result} mod {p}.
                </p>
            </>
        ),
        result: privateKey.result,
    };
}
