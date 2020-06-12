import React from 'react';
import { Input } from '../tools/input';
import { generateMatrix, flipMatrix } from './generateMatrix';

export type IMatrixState = {
    width: number;
    height: number;
    polynom: boolean[];
    matrix: boolean[][];
};

export class Matrix extends React.Component<{}, IMatrixState> {
    state: IMatrixState = {
        width: 3,
        height: 5,
        polynom: [],
        matrix: [],
    };

    update() {
        this.setState({
            matrix: generateMatrix(this.state.width, this.state.height, this.state.polynom),
        });
    }

    render() {
        let controls: JSX.Element[] = [];
        for (let i = 0; i < this.state.height; i++) {
            controls.push(
                <Input
                    label={i === 0 ? '1' : i === 1 ? 'x' : 'x^' + i}
                    onChange={(value) => {
                        const newArr = Array.from(this.state.polynom);
                        newArr[i] = value !== 0;
                        this.setState({ polynom: newArr });
                    }}
                    value={this.state.polynom[i] ? 1 : 0}
                />,
            );
        }

        return (
            <>
                <Input
                    label="šiřka = "
                    onChange={(value) => {
                        this.setState({ width: value });
                    }}
                    value={this.state.width}
                />
                <Input
                    label="výška = "
                    onChange={(value) => {
                        this.setState({ height: value });
                    }}
                    value={this.state.height}
                />
                <hr />
                {controls}
                <button type="button" className="btn btn-primary" onClick={() => this.update()}>
                    Vypočítej!
                </button>

                <hr />
                <table className="matrix">
                    {this.state.matrix.length > 0 &&
                        flipMatrix(this.state.matrix, this.state.width, this.state.height).map((row, y) => (
                            <tr
                                className={y === this.state.height - this.state.width - 1 ? 'border-bottom' : undefined}
                            >
                                {row.map((cell, x) => (
                                    <td>{cell ? '1' : '0'}</td>
                                ))}
                            </tr>
                        ))}
                </table>
            </>
        );
    }
}
