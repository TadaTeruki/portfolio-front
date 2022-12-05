import axios from 'axios'
import ConvertToSha256 from 'packages/Hash/Hash'

class LoginRequest {
    name: string = ''
    passwd: string = ''
}

const RequestLogin = (
    name_: string,
    passwd_: string,
    ok_: (res: any) => void,
    err_: (err: any) => void,
) => {
    const request: LoginRequest = {
        name: ConvertToSha256(name_),
        passwd: ConvertToSha256(passwd_),
    }

    axios
        .post(process.env.REACT_APP_PORTFOLIO_SERVER_URL + '/login', request)
        .then((res) => {
            ok_(res)
        })
        .catch((err) => {
            err_(err)
        })
}

export default RequestLogin
