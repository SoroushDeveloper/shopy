import {NextPage} from "next";
import Image from "next/image";
import Router from "next/router";
import {useEffect} from "react";
import {NextPageWithLayout} from "@/pages/_app";

import VerifyForm from "@/app/forms/auth/verifyForm";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectVerifyToken, updateVerifyToken} from "@/app/store/auth";
import GuestPanelLayout from "@/app/components/guestPanelLayout";

const Verify: NextPageWithLayout = () => {

    const dispatch = useAppDispatch();
    const token = useAppSelector(selectVerifyToken);

    const clearVerifyToken = () => {
        dispatch(updateVerifyToken(undefined))
    }

    useEffect(() => {
        Router.beforePopState(() => {
            clearVerifyToken();
            return true;
        })

        if (token === undefined) {
            Router.push('/auth/login');
        }
    }, [token]);

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"
                               className="w-8 h-8 mr-2" width="60" height="60"/>
                        Shopy
                    </a>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Verify your phone number
                            </h1>
                            <VerifyForm token={token} clearToken={clearVerifyToken}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Verify.getLayout = page => <GuestPanelLayout>{page}</GuestPanelLayout>

export default Verify