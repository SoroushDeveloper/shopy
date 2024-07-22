import {Form, FormikProps} from "formik";

import Input from "@/app/components/shared/form/input";
import {LoginFormValuesInterface} from "@/app/contracts/auth";
import Link from "next/link";

const InnerLoginForm = (props: FormikProps<LoginFormValuesInterface>) => {
    return (
        <Form className="space-y-4 md:space-y-6">
            <div>
                <Input name="phone" label="Phone Number" placeholder="09123456789"/>
            </div>
            <button type="submit"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Not registered yet ?
                <Link href="/auth/register"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500 ml-1">
                    Register
                </Link>
            </p>
        </Form>
    )
}

export default InnerLoginForm