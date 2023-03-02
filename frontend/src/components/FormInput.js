import React, { useState } from 'react';
import "./FormInput.css"

const FormInput = (props) => {

    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    }

    const {label, errorMessage, onChange, id, ...inputProps} = props;

        return (
            <div className="formInput">
                <label>{label}</label>
                <input 
                    {...inputProps} 
                    onChange={onChange}
                    onBlur={handleFocus} 
                    onFocus={() => inputProps.name==="confirmPassword" && setFocused(true)}
                    focused={focused.toString()}
                />
                <span>{errorMessage}</span>
            </div>
        );
    }

export default FormInput;

