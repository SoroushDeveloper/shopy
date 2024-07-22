import {withFormik} from "formik";
import * as yup from 'yup';
import Router from "next/router";

import {RegisterFormValuesInterface} from "@/app/contracts/auth";
import InnerRegisterForm from "@/app/components/auth/innerRegisterForm";
import callApi from "@/app/helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";

const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/

const registerFormValidationSchema = yup.object().shape({
    name: yup.string().required().min(4),
    phone: yup.string().required().min(8).matches(phoneRegExp, 'Phone number format is invalid'),
})

interface RegisterFormProps {
}

const RegisterForm = withFormik<RegisterFormProps, RegisterFormValuesInterface>({
    mapPropsToValues: props => ({
        name: '',
        phone: '',
    }),
    validationSchema: registerFormValidationSchema,
    handleSubmit: async (values, {setFieldError}) => {
        try {
            const res = await callApi().post('/auth/register', values);
            if (res.status === 201) {
                Router.push('/auth/login');
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                Object.entries(error.messages).forEach(([key, value]) => setFieldError(key, value as string))
            }
        }
    }
})(InnerRegisterForm)

export default RegisterForm