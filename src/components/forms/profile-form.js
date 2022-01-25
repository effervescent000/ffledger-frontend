import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

import NumberInput from "../forms/form-components/number-input";
import TextInput from "./form-components/text-input";
import SelectField from "./form-components/select-field";

const ProfileForm = (props) => {
    const { profileData } = props;
    const inputWrapperName = "job-level-input-wrapper";
    const [worlds, setWorlds] = useState([]);

    useEffect(() => {
        if (worlds.length === 0) {
            getWorlds();
        }
    });

    const getWorlds = () => {
        axios
            .get(`${process.env.REACT_APP_DOMAIN}/world/get`)
            .then((response) => {
                setWorlds(response.data);
            })
            .catch((error) => console.log(error.response));
    };

    const populateWorlds = () => {
        return worlds.map((world) => (
            <option key={world.id} value={world.id}>
                {world.name}
            </option>
        ));
    };

    return (
        <Formik
            initialValues={{
                world: profileData ? profileData.world.id : "",
                alcLevel: profileData ? profileData.alc_level : "",
                armLevel: profileData ? profileData.arm_level : "",
                bsmLevel: profileData ? profileData.bsm_level : "",
                crpLevel: profileData ? profileData.crp_level : "",
                culLevel: profileData ? profileData.cul_level : "",
                gsmLevel: profileData ? profileData.gsm_level : "",
                ltwLevel: profileData ? profileData.ltw_level : "",
                wvrLevel: profileData ? profileData.wvr_level : "",
                retainers: profileData
                    ? profileData.retainers.map((retainer) => retainer.name)
                    : [],
            }}
            validationSchema={Yup.object({
                alcLevel: Yup.number().integer("Must be an integer"),
                armLevel: Yup.number().integer("Must be an integer"),
                bsmLevel: Yup.number().integer("Must be an integer"),
                crpLevel: Yup.number().integer("Must be an integer"),
                culLevel: Yup.number().integer("Must be an integer"),
                gsmLevel: Yup.number().integer("Must be an integer"),
                ltwLevel: Yup.number().integer("Must be an integer"),
                wvrLevel: Yup.number().integer("Must be an integer"),
            })}
            onSubmit={(values) => {
                props.setFormData(values);
            }}
        >
            {(props) => {
                const { values } = props;
                return (
                    <Form>
                        <SelectField label="World" name="world" divclass="world-select-wrapper">
                            {populateWorlds()}
                        </SelectField>
                        <NumberInput
                            label="ALC level"
                            name="alcLevel"
                            divclass={inputWrapperName}
                        />
                        <NumberInput
                            label="ARM level"
                            name="armLevel"
                            divclass={inputWrapperName}
                        />
                        <NumberInput
                            label="BSM level"
                            name="bsmLevel"
                            divclass={inputWrapperName}
                        />
                        <NumberInput
                            label="CRP level"
                            name="crpLevel"
                            divclass={inputWrapperName}
                        />
                        <NumberInput
                            label="CUL level"
                            name="culLevel"
                            divclass={inputWrapperName}
                        />
                        <NumberInput
                            label="GSM level"
                            name="gsmLevel"
                            divclass={inputWrapperName}
                        />
                        <NumberInput
                            label="LTW level"
                            name="ltwLevel"
                            divclass={inputWrapperName}
                        />
                        <NumberInput
                            label="WVR level"
                            name="wvrLevel"
                            divclass={inputWrapperName}
                        />
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
                                                        divclass="retainer-input"
                                                    />
                                                    <div className="btn-wrapper">
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div id="add-retainer-btn">
                                            <button type="button" onClick={() => push("")}>
                                                Add retainer
                                            </button>
                                        </div>
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
