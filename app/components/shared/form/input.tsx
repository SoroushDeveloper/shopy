import {ErrorMessage, Field} from "formik";
import {FC} from "react";

interface InputProps {
    name: string,
    label: string,
    type?: string,
    placeholder?: string,
    inputClassName?: string,
    labelClassName?: string,
    errorClassName?: string
}

const Input: FC<InputProps> = (
    {
        name,
        label,
        type = 'text',
        placeholder,
        inputClassName,
        labelClassName,
        errorClassName
    }) => {

    return (
        <>
            <label htmlFor={name}
                   className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelClassName ?? ''}`}>
                {label}
            </label>
            <Field id={name} name={name} type={type} placeholder={placeholder}
                   className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputClassName ?? ''}`}/>
            <ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component="div"/>
        </>
    );

}

export default Input;