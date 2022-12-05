import axios from 'axios'

class UpdateRequest {
    title: string = ''
    subtitle: string = ''
    body: string = ''
    tags: string[] = []
    is_public: boolean = false
}

const RequestUpdateArticle = (
    token: string,
    id: string,
    request: UpdateRequest,
    ok_: () => void,
    err_: (message: string) => void,
) => {
    const headers_ = {
        Authorization: token ? token : '',
    }
    axios
        .put(
            process.env.REACT_APP_PORTFOLIO_SERVER_URL + '/article/' + id,
            request,
            { headers: headers_ },
        )
        .then(() => {
            ok_()
        })
        .catch((err) => {
            err_(err.message)
        })
}

export default RequestUpdateArticle
