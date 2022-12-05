import axios from 'axios'

class ReadRequest {
    id: string = ''
}

class ReadResponse {
    title: string = ''
    subtitle: string = ''
    body: string = ''
    tags: string[] = []
    created_at: string = ''
    updated_at: string = ''
    is_public: boolean = false
}

const RequestReadArticle = (
    request: ReadRequest,
    ok_: (res: ReadResponse) => void,
    err_: (message: string) => void,
) => {
    axios
        .get(
            process.env.REACT_APP_PORTFOLIO_SERVER_URL +
                '/article/' +
                request.id,
        )
        .then((res) => {
            const response: ReadResponse = {
                title: res.data.title,
                subtitle: res.data.subtitle,
                body: res.data.body,
                tags: res.data.tags,
                created_at: res.data.created_at,
                updated_at: res.data.updated_at,
                is_public: res.data.is_public,
            }
            ok_(response)
        })
        .catch((err) => {
            err_(err.message)
        })
}

export default RequestReadArticle
