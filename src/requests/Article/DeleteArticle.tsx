import axios from 'axios'

const RequestDeleteArticle = (
    token: string,
    id: string,
    ok_: () => void,
    err_: (message: string) => void,
) => {
    const headers_ = {
        Authorization: token ? token : '',
    }
    axios
        .delete(process.env.REACT_APP_PORTFOLIO_SERVER_URL + '/article/' + id, {
            headers: headers_,
        })
        .then((_) => {
            ok_()
        })
        .catch((err) => {
            err_(err.message)
        })
}

export default RequestDeleteArticle
