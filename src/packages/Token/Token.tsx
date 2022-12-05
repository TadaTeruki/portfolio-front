import { useCookies } from 'react-cookie'

const QueryToken = () => {
    const [cookies] = useCookies()
    return cookies.portfolioToken
}

export default QueryToken
