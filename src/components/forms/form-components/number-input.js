import React from "react";
import { useField } from "formik";

const NumberInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={props.divclass}>
            <div className="label-wrapper">
                <label htmlFor={props.id || props.name}>{label}</label>
            </div>
            <div className="input-wrapper">
                <input
                    className={`number-input${meta.error && meta.touched ? " error" : ""}`}
                    type="text"
                    {...field}
                    {...props}
                />
            </div>

            {meta.touched && meta.error ? <div className="error-msg">{meta.error}</div> : null}
        </div>
    );
};

export default NumberInput;
