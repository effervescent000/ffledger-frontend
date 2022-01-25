import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

import NumberInput from "../forms/form-components/number-input";
import TextInput from "./form-components/text-input";

const ProfileForm = (props) => {
    return (
        <Formik
            initialValues={{
                alcLevel: "",
                armLevel: "",
                bsmLevel: "",
                crpLevel: "",
                culLevel: "",
                gsmLevel: "",
                ltwLevel: "",
                wvrLevel: "",
                retainers: [],
            }}
            onSubmit={(values) => {
                props.setFormData(values);
            }}
        >
            {(props) => {
                const { values } = props;
                return (
                    <Form>
                        <NumberInput label="ALC level" name="alcLevel" />
                        <NumberInput label="ARM level" name="armLevel" />
                        <NumberInput label="BSM level" name="bsmLevel" />
                        <NumberInput label="CRP level" name="crpLevel" />
                        <NumberInput label="CUL level" name="culLevel" />
                        <NumberInput label="GSM level" name="gsmLevel" />
                        <NumberInput label="LTW level" name="ltwLevel" />
                        <NumberInput label="WVR level" name="wvrLevel" />
                        <FieldArray name="retainers">
                            {({ remove, push }) => {
                                return (
                                    <div id="retainers-array-wrapper">
                                        {values.retainers.map((retainer, index) => {
                                            return (
                                                <div
                                                    key={`retainer-${index}`}
                                                    className="retainer-wrapper"
                                                >
                                                    <TextInput
                                                        label={`Retainer ${index + 1}`}
                                                        name={`retainers.${index}`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        <button type="button" onClick={() => push("")}>
                                            Add retainer
                                        </button>
                                    </div>
                                );
                            }}
                        </FieldArray>
                        <button type="submit">Save</button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ProfileForm;
