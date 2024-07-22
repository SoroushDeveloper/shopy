import {ReactNode} from "react";
import useAuth from "@/app/hooks/useAuth";
import {useRouter} from "next/router";

interface Props {
    children: ReactNode,
}

const AdminPanelLayout = ({children}: Props) => {
    const router = useRouter()
    const {user, error, loading} = useAuth()

    if (loading) return <h1>Loading ...</h1>

    if (error) {
        // show error
        router.push('/auth/login');
    }

    if (!user?.is_admin) {
        router.push('/');
    }

    return (
        <div className="w-full text-2xl">
            {children}
        </div>
    )
}

export default AdminPanelLayout