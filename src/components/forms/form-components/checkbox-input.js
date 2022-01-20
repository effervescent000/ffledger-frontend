import React from "react";
import { useField } from "formik";

const CheckboxInput = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });

    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
        </div>
    );
};

export default CheckboxInput;
