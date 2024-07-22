import Cookies from "universal-cookie";
import useSWR from "swr";
import callApi from "@/app/helpers/callApi";
import {useAppDispatch} from "@/app/hooks/index";
import {updateUser} from "@/app/store/auth";

const useAuth = () => {
    const dispatch = useAppDispatch();
    const cookies = new Cookies

    const {data, error} = useSWR('user-me', () => {
        return callApi().get('/user')
    })

    dispatch(updateUser(data?.data?.user))

    return {user: data?.data?.user, error, loading: !data && !error}
}

export default useAuth;