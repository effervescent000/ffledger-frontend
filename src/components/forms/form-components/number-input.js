import React from "react";
import { useField } from "formik";

const NumberInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={props.divclass}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input
                className={`number-input ${meta.error && meta.touched ? "error" : null}`}
                type="number"
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? <div className="error-msg">{meta.error}</div> : null}
        </div>
    );
};

export default NumberInput;
