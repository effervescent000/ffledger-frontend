import React from "react";
import { useField } from "formik";

const SelectField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={props.divclass}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select
                className={`select-input ${meta.error && meta.touched ? "error" : null}`}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? <div className="error-msg">{meta.error}</div> : null}
        </div>
    );
};

export default SelectField;
