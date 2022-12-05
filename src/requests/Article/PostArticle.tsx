import axios from 'axios'

class PostRequest {
    title: string = ''
    subtitle: string = ''
    body: string = ''
    tags: string[] = []
    is_public: boolean = false
}

class PostResponse {
    id: string = ''
}

const RequestPostArticle = (
    token: string,
    request: PostRequest,
    ok_: (res: PostResponse) => void,
    err_: (message: string) => void,
) => {
    const headers_ = {
        Authorization: token ? token : '',
    }

    axios
        .post(
            process.env.REACT_APP_PORTFOLIO_SERVER_URL + '/article',
            request,
            { headers: headers_ },
        )
        .then((res) => {
            ok_({
                id: res.data.id,
            })
        })
        .catch((err) => {
            err_(err.message)
        })
}

export default RequestPostArticle
