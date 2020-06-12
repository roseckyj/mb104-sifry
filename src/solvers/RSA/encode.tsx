import React from 'react';
import { rsa_encode } from './rsa';
import { Input } from '../tools/input';

export type IRSA_encodeState = {
    p: number;
    q: number;
    e: number;
    m: number;
    steps: JSX.Element;
};

export class RSA_encode extends React.Component<{}, IRSA_encodeState> {
    state: IRSA_encodeState = {
        p: 0,
        q: 0,
        e: 0,
        m: 0,
        steps: <></>,
    };

    update() {
        this.setState({ steps: rsa_encode(this.state.e, this.state.p, this.state.q, this.state.m).steps });
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
