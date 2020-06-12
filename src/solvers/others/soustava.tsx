import React from 'react';
import { Input } from '../tools/input';
import { soustavaKongruenci } from '../tools/soustavaKongruenci';

export type ISoustavaKongruenciState = {
    r1: number;
    mod1: number;
    r2: number;
    mod2: number;
    steps: JSX.Element;
};

export class SoustavaKongruenci extends React.Component<{}, ISoustavaKongruenciState> {
    state: ISoustavaKongruenciState = {
        r1: 0,
        mod1: 0,
        r2: 0,
        mod2: 0,
        steps: <></>,
    };

    update() {
        this.setState({
            steps: soustavaKongruenci(this.state.r1, this.state.mod1, this.state.r2, this.state.mod2, 'x').steps,
        });
    }

    render() {
        return (
            <>
                <Input
                    label="1. pravá strana (x ≡ ## (mod _)) "
                    onChange={(value) => {
                        this.setState({ r1: value });
                    }}
                    value={this.state.r1}
                />
                <Input
                    label="1. modulo (x ≡ _ (mod ##)) "
                    onChange={(value) => {
                        this.setState({ mod1: value });
                    }}
                    value={this.state.mod1}
                />
                <Input
                    label="2. pravá strana (x ≡ ## (mod _)) "
                    onChange={(value) => {
                        this.setState({ r2: value });
                    }}
                    value={this.state.r2}
                />
                <Input
                    label="2. modulo (x ≡ _ (mod ##)) "
                    onChange={(value) => {
                        this.setState({ mod2: value });
                    }}
                    value={this.state.mod2}
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
