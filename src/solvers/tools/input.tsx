import React from 'react';

export type IInputProps = {
    value: number;
    label: string;
    onChange: (value: number) => void;
};

export class Input extends React.Component<IInputProps, {}> {
    changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(parseInt(event.target.value) || 0);
    };

    render() {
        return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">{this.props.label}</span>
                </div>
                <input
                    type="number"
                    className="form-control"
                    aria-label=""
                    onChange={this.changeHandler}
                    value={this.props.value}
                />
            </div>
        );
    }
}
