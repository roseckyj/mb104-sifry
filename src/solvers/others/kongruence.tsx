import React from 'react';
import { Input } from '../tools/input';
import { kongruence } from '../tools/kongruence';

export type IKongruenceState = {
    a: number;
    b: number;
    mod: number;
    steps: JSX.Element;
};

export class Kongruence extends React.Component<{}, IKongruenceState> {
    state: IKongruenceState = {
        a: 0,
        b: 0,
        mod: 0,
        steps: <></>,
    };

    update() {
        this.setState({
            steps: kongruence(this.state.a, this.state.b, this.state.mod, 'x').steps,
        });
    }

    render() {
        return (
            <>
                <Input
                    label="levá strana (##x ≡ __ (mod __)) "
                    onChange={(value) => {
                        this.setState({ a: value });
                    }}
                    value={this.state.a}
                />
                <Input
                    label="pravá strana (__x ≡ ## (mod __)) "
                    onChange={(value) => {
                        this.setState({ b: value });
                    }}
                    value={this.state.b}
                />
                <Input
                    label="modulo (__x ≡ __ (mod ##)) "
                    onChange={(value) => {
                        this.setState({ mod: value });
                    }}
                    value={this.state.mod}
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
