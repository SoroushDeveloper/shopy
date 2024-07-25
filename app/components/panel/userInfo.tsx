import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/auth";
import {removeLoginToken} from "@/app/helpers/auth";
import {useRouter} from "next/router";

const UserInfo = () => {
    const user = useAppSelector(selectUser)
    const router = useRouter();
    const logoutHandler = async () => {
        await removeLoginToken();
        await router.push('/');
    }
    return (
        <>
            <span>Username : </span>
            <h2>{user?.name}</h2>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}

export default UserInfo