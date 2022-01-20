import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import NumberInput from "./form-components/number-input";

const CraftFiltersForm = (props) => {
    return (
        <Formik
            initialValues={{
                alcEnabled: true,
                alcMinLevel: "",
                armEnabled: true,
                armMinLevel: "",
                bsmEnabled: true,
                bsmMinLevel: "",
                crpEnabled: true,
                crpMinLevel: "",
                culEnabled: true,
                culMinLevel: "",
                gsmEnabled: true,
                gsmMinLevel: "",
                ltwEnabled: true,
                ltwMinLevel: "",
                wvrEnabled: true,
                wvrMinLevel: "",
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
            }}
        >
            <Form>
                <NumberInput label="ALC min level" name="alcMinLevel" />
            </Form>
        </Formik>
    );
};

export default CraftFiltersForm;
