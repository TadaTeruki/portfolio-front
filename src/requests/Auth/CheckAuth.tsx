import axios from 'axios'

const RequestCheckAuth = (
    token: string,
    ok_: (res: string) => void,
    err_: (message: string) => void,
) => {
    const headers_ = {
        Authorization: token ? token : '',
    }
    axios
        .get(process.env.REACT_APP_PORTFOLIO_SERVER_URL + '/auth', {
            headers: headers_,
        })
        .then((res) => {
            if (res.data.owner_id === '' || res.data.owner_id === null) {
                err_('許可されていません')
            } else {
                ok_(res.data.owner_id)
            }
        })
        .catch((err) => {
            err_(err.message)
        })
}

export default RequestCheckAuth
