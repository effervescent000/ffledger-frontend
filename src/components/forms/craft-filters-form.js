import React from "react";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import NumberInput from "./form-components/number-input";
import CheckboxInput from "./form-components/checkbox-input";

const CraftFiltersForm = (props) => {
    const filterSettings = Cookies.get("filterSettings")
        ? JSON.parse(Cookies.get("filterSettings"))
        : {};

    return (
        <Formik
            initialValues={{
                alcEnabled: filterSettings.alcEnabled || true,
                alcMinLevel: filterSettings.alcMinLevel || "",
                armEnabled: filterSettings.armEnabled || true,
                armMinLevel: filterSettings.armMinLevel || "",
                bsmEnabled: filterSettings.bsmEnabled || true,
                bsmMinLevel: filterSettings.bsmMinLevel || "",
                crpEnabled: filterSettings.crpEnabled || true,
                crpMinLevel: filterSettings.crpMinLevel || "",
                culEnabled: filterSettings.culEnabled || true,
                culMinLevel: filterSettings.culMinLevel || "",
                gsmEnabled: filterSettings.gsmEnabled || true,
                gsmMinLevel: filterSettings.gsmMinLevel || "",
                ltwEnabled: filterSettings.ltwEnabled || true,
                ltwMinLevel: filterSettings.ltwMinLevel || "",
                wvrEnabled: filterSettings.wvrEnabled || true,
                wvrMinLevel: filterSettings.wvrMinLevel || "",
            }}
            validationSchema={Yup.object({
                alcMinLevel: Yup.number().integer("Must be an integer"),
                armMinLevel: Yup.number().integer("Must be an integer"),
                bsmMinLevel: Yup.number().integer("Must be an integer"),
                crpMinLevel: Yup.number().integer("Must be an integer"),
                culMinLevel: Yup.number().integer("Must be an integer"),
                gsmMinLevel: Yup.number().integer("Must be an integer"),
                ltwMinLevel: Yup.number().integer("Must be an integer"),
                wvrMinLevel: Yup.number().integer("Must be an integer"),
            })}
            onSubmit={(values) => {
                props.setFilterSettings(values);
                Cookies.set("filterSettings", JSON.stringify(values));
            }}
        >
            <Form>
                <div id="entries-wrapper">
                    <div className="job-wrapper">
                        <CheckboxInput name="alcEnabled">ALC</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="alcMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                    <div className="job-wrapper">
                        <CheckboxInput name="armEnabled">ARM</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="armMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                    <div className="job-wrapper">
                        <CheckboxInput name="bsmEnabled">BSM</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="bsmMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                    <div className="job-wrapper">
                        <CheckboxInput name="crpEnabled">CRP</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="crpMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                    <div className="job-wrapper">
                        <CheckboxInput name="culEnabled">CUL</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="culMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                    <div className="job-wrapper">
                        <CheckboxInput name="gsmEnabled">GSM</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="gsmMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                    <div className="job-wrapper">
                        <CheckboxInput name="ltwEnabled">LTW</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="ltwMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                    <div className="job-wrapper">
                        <CheckboxInput name="wvrEnabled">WVR</CheckboxInput>
                        <NumberInput
                            label="Min level"
                            name="wvrMinLevel"
                            divclass="min-level-input"
                        />
                    </div>
                </div>
                <button type="submit">Save filters</button>
            </Form>
        </Formik>
    );
};

export default CraftFiltersForm;
