import {withFormik} from "formik";
import * as yup from 'yup';

import {VerifyFormValuesInterface} from "@/app/contracts/auth";
import callApi from "@/app/helpers/callApi";
import ValidationError from "@/app/exceptions/validationError";
import Router from "next/router";
import InnerVerifyForm from "@/app/components/auth/innerVerifyForm";
import {storeLoginToken} from "@/app/helpers/auth";


const verifyFormValidationSchema = yup.object().shape({
    code: yup.string().required().matches(/^[0-9]+$/, 'only numbers are allowed').length(6),
})

interface VerifyFormProps {
    token?: string,
    clearToken: () => void,
}

const VerifyForm = withFormik<VerifyFormProps, VerifyFormValuesInterface>({
    mapPropsToValues: props => ({
        code: '',
        token: props.token ?? '',
    }),
    validationSchema: verifyFormValidationSchema,
    handleSubmit: async (values, {props, setFieldError}) => {
        const res = await callApi().post('/auth/login/verify-phone', values)
        if (res.status === 200) {
            storeLoginToken(res.data.user.token);
            await Router.push('/panel');
            props.clearToken();
        }
        try {
            console.log(values);
        } catch (error) {
            if (error instanceof ValidationError) {
                Object.entries(error.messages).forEach(([key, value]) => setFieldError(key, value as string))
            }
        }
    }
})(InnerVerifyForm)

export default VerifyForm