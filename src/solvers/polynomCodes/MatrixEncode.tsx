import React from 'react';
import { Input } from '../tools/input';
import { generateMatrix, flipMatrix, polynomToFixedLength } from './generateMatrix';
import { encodeWithPolynom } from './encode';

export type IMatrixEncodeState = {
    width: number;
    height: number;
    polynom: boolean[];
    matrix: boolean[][];
    message: boolean[];
};

export class MatrixEncode extends React.Component<{}, IMatrixEncodeState> {
    state: IMatrixEncodeState = {
        width: 3,
        height: 5,
        polynom: [],
        matrix: [],
        message: [],
    };

    update() {
        this.setState({
            matrix: generateMatrix(this.state.width, this.state.height, this.state.polynom),
        });
    }

    render() {
        let controls: JSX.Element[] = [];
        controls.push(<p>Generující polynom:</p>);
        for (let i = 0; i < this.state.height - this.state.width + 1; i++) {
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
        controls.push(<hr />, <p>Zpráva:</p>);
        for (let i = 0; i < this.state.width; i++) {
            controls.push(
                <Input
                    label={'' + (i + 1)}
                    onChange={(value) => {
                        const newArr = Array.from(this.state.message);
                        newArr[i] = value !== 0;
                        this.setState({ message: newArr });
                    }}
                    value={this.state.message[i] ? 1 : 0}
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
                <p>Matici kódu vynásobíme zprávou, kterou chceme zakódovat:</p>
                <table className="matrix">
                    {this.state.matrix.length > 0 &&
                        flipMatrix(this.state.matrix, this.state.width, this.state.height).map((row, y) => (
                            <tr
                                className={y === this.state.height - this.state.width - 1 ? 'matrix-border' : undefined}
                            >
                                {row.map((cell, x) => (
                                    <td>{cell ? '1' : '0'}</td>
                                ))}
                            </tr>
                        ))}
                </table>{' '}
                ·{' '}
                <table className="matrix">
                    {polynomToFixedLength(this.state.message, this.state.width).map((row, y) => (
                        <tr>
                            <td>{row ? '1' : '0'}</td>
                        </tr>
                    ))}
                </table>{' '}
                ={' '}
                <table className="matrix">
                    {this.state.matrix.length > 0 &&
                        encodeWithPolynom(
                            this.state.width,
                            this.state.height,
                            this.state.matrix,
                            polynomToFixedLength(this.state.message, this.state.width),
                        ).map((row, y) => (
                            <tr
                                className={y === this.state.height - this.state.width - 1 ? 'matrix-border' : undefined}
                            >
                                <td>{row ? '1' : '0'}</td>
                            </tr>
                        ))}
                </table>
            </>
        );
    }
}
