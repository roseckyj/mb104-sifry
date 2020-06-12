import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './style.css';
import { RSA_encode } from './solvers/RSA/encode';
import { RSA_decode } from './solvers/RSA/decode';
import { SoustavaKongruenci } from './solvers/others/soustava';
import { DiffieHellman } from './solvers/DiffieHellman/encode';
import { ElGamal_encode } from './solvers/ElGamal/encode';
import { ElGamal_decode } from './solvers/ElGamal/decode';
import { Rabin_decode } from './solvers/Rabin/decode';
import { Rabin_encode } from './solvers/Rabin/encode';
import { generateMatrix } from './solvers/polynomCodes/generateMatrix';
import { encodeWithPolynom } from './solvers/polynomCodes/encode';
import { Matrix } from './solvers/polynomCodes/Matrix';
import { MatrixEncode } from './solvers/polynomCodes/MatrixEncode';

export type AppState = {};

const tabs: { title: string; content: JSX.Element }[] = [
    { title: 'Soustava 2 kongruencí', content: <SoustavaKongruenci /> },
    { title: 'RSA zašifrování', content: <RSA_encode /> },
    { title: 'RSA odšifrování', content: <RSA_decode /> },
    { title: 'Diffie-Hellman', content: <DiffieHellman /> },
    { title: 'ElGamal zašifrování', content: <ElGamal_encode /> },
    { title: 'ElGamal odšifrování', content: <ElGamal_decode /> },
    { title: 'Rabin zašifrování', content: <Rabin_encode /> },
    { title: 'Rabin odšifrování', content: <Rabin_decode /> },
    { title: 'Polynomiální matice', content: <Matrix /> },
    { title: 'Polynom -> zakódování', content: <MatrixEncode /> },
];

export class App extends React.Component<{}, AppState> {
    render() {
        return (
            <div className="m-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {tabs.map((tab, index) => (
                        <li className="nav-item" role="presentation">
                            <a
                                className={'nav-link' + (index === 0 ? ' active' : '')}
                                id={'tab-' + index + '-tab'}
                                data-toggle="tab"
                                href={'#tab-' + index}
                                role="tab"
                                aria-controls={'tab-' + index}
                                aria-selected={index === 0 ? 'true' : 'false'}
                            >
                                {tab.title}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="tab-content" id="myTabContent">
                    {tabs.map((tab, index) => (
                        <div
                            className={'tab-pane fade' + (index === 0 ? ' show active' : '')}
                            id={'tab-' + index}
                            role="tabpanel"
                            aria-labelledby={'tab-' + index + '-tab'}
                        >
                            <div className="solution">{tab.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
