import useAuth from "@/app/hooks/useAuth";
import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/auth";

const UserInfo = () => {
    // const {user} = useAuth();
    const user = useAppSelector(selectUser)
    return (
        <>
            <span>Username : </span>
            <h2>{user?.name}</h2>
        </>
    )
}

export default UserInfo