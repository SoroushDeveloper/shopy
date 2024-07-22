import Cookies from "universal-cookie";

const storeLoginToken = async (token: string, days: number = 10) => {
    await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
    });
}

const removeLoginToken = () => {

}

export {storeLoginToken, removeLoginToken};