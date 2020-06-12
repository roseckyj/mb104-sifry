import React from 'react';
import { rsa_decode } from './rsa';
import { Input } from '../tools/input';

export type IRSA_decodeState = {
    p: number;
    q: number;
    e: number;
    c: number;
    steps: JSX.Element;
};

export class RSA_decode extends React.Component<{}, IRSA_decodeState> {
    state: IRSA_decodeState = {
        p: 0,
        q: 0,
        e: 0,
        c: 0,
        steps: <></>,
    };

    update() {
        this.setState({ steps: rsa_decode(this.state.e, this.state.p, this.state.q, this.state.c).steps });
    }

    render() {
        return (
            <>
                <Input
                    label="e (exponent) = "
                    onChange={(value) => {
                        this.setState({ e: value });
                    }}
                    value={this.state.e}
                />
                <Input
                    label="p (prvočíslo 1) = "
                    onChange={(value) => {
                        this.setState({ p: value });
                    }}
                    value={this.state.p}
                />
                <Input
                    label="q (prvočíslo 2) = "
                    onChange={(value) => {
                        this.setState({ q: value });
                    }}
                    value={this.state.q}
                />
                <Input
                    label="c (šifrovaná zpráva) = "
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
