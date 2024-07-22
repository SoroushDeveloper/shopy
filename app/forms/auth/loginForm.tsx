import {withFormik} from "formik";
import * as yup from 'yup';

import {LoginFormValuesInterface} from "@/app/contracts/auth";
import InnerLoginForm from "@/app/components/auth/innerLoginForm";
import callApi from "@/app/helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import Router from "next/router";

const phoneRegExp = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/

const loginFormValidationSchema = yup.object().shape({
    phone: yup.string().required().min(8).matches(phoneRegExp, 'Phone number format is invalid'),
})

interface LoginFormProps {
    setToken: (token: string) => void
}

const LoginForm = withFormik<LoginFormProps, LoginFormValuesInterface>({
    mapPropsToValues: props => ({
        phone: '',
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: async (values, {props, setFieldError}) => {
        try {
            const res = await callApi().post('/auth/login', values);
            if (res.status === 200) {
                props.setToken(res.data.token);
                Router.push('/auth/login/verify')
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                Object.entries(error.messages).forEach(([key, value]) => setFieldError(key, value as string))
            }
        }
    }
})(InnerLoginForm)

export default LoginForm