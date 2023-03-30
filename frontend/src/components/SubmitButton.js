import React from "react";

class SubmitButton extends React.Component {
    render() {
        return (
            <div className="submitButton">

                <button
                    className="btn"
                    disabled={this.props.disabled}
                    conClick={ () => this.props.conClick()}
                >
                    {this.props.text}
                </button>

            </div>
        );
    }
}

export default SubmitButton;