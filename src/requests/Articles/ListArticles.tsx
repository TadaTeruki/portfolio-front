import axios from 'axios'

class ListResponse {
    title: string = ''
    subtitle: string = ''
    body: string = ''
    tags: string[] = []
    created_at: string = ''
    updated_at: string = ''
    is_public: boolean = false
}

const RequestListArticles = (
    token: string,
    ok_: (res: ListResponse[]) => void,
    err_: (message: string) => void,
) => {
    const headers_ = {
        Authorization: token ? token : '',
    }
    axios
        .get(process.env.REACT_APP_PORTFOLIO_SERVER_URL + '/articles', {
            headers: headers_,
        })
        .then((res) => {
            var responses: ListResponse[] = []
            for (let i = 0; i < res.data.articles.length; i++) {
                responses.push(res.data.articles[i])
            }
            ok_(responses)
        })
        .catch((err) => {
            err_(err.message)
        })
}

export default RequestListArticles
