import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import List from './List'
import TagList from '../../components/TagList'
import Header from 'pages/Header/Header'
import RequestCheckAuth from 'requests/Auth/CheckAuth'
import RequestListArticles from 'requests/Articles/ListArticles'
import RequestPostArticle from 'requests/Article/PostArticle'
import QueryToken from 'packages/Token/Token'
import SetDocumentTitle from 'packages/DocumentTitle/SetDocumentTitle'

const BlogList = () => {
    SetDocumentTitle('Blog')

    const searcher = useLocation().search
    const search_keyword = new URLSearchParams(searcher).get('search')

    const [stateResponses, setResponses] = useState<any[]>([])
    const [stateErr, setErr] = useState<string>('')
    const [stateSearch, setSearch] = useState<string>(
        search_keyword == null ? '' : search_keyword,
    )
    const [stateAuth, setAuth] = useState<boolean>(false)
    const navigate = useNavigate()

    const token = QueryToken()

    useEffect(() => {
        RequestCheckAuth(
            token,
            () => {
                setAuth(true)
            },
            () => {},
        )

        RequestListArticles(
            token,
            (responses) => {
                if (!responses.length) {
                    setErr(
                        '記事を読み込めません (データベースが正常に動作していない可能性があります)',
                    )
                } else {
                    setResponses(responses)
                }
            },
            (message) => {
                setErr(message)
            },
        )
    }, [token])

    const updateSearch = (event: any) => setSearch(event.target.value)

    const onPushTag = (tag: string) =>
        setSearch(stateSearch + (stateSearch === '' ? '#' : ' #') + tag)

    const postArticle = () => {
        RequestPostArticle(
            token,
            {
                title: '新しい記事',
                subtitle: '',
                body: '',
                tags: [''],
                is_public: false,
            },
            (res) => {
                navigate('/blog/' + res.id + '/edit')
            },
            (message) => {
                setErr(message)
            },
        )
    }

    return (
        <>
            <Header />
            <div className="page-base">
                <div className="blog-list-title">
                    <h2>Blog</h2>
                    <h3>技術や生活に関する記事を載せています</h3>
                </div>

                <div className="blog-list-container">
                    <h3>検索</h3>
                    <input
                        type="text"
                        className="blog-text-entry blog-list-text-entry"
                        placeholder="検索"
                        value={stateSearch}
                        onChange={updateSearch}
                    />
                    <br />
                    <br />
                    <TagList
                        key={0}
                        tags={['技術', 'LT', '旅行', '未来大']}
                        onPushTag={onPushTag}
                    />
                    <br />

                    {stateAuth ? (
                        <button onClick={postArticle}>+ 新規作成</button>
                    ) : (
                        <></>
                    )}

                    {stateResponses.length > 0 ? (
                        <List
                            articles={stateResponses}
                            keywords={stateSearch.split(' ')}
                            onPushTag={onPushTag}
                        />
                    ) : (
                        <>記事取得中...</>
                    )}
                </div>

                <div className="error">{stateErr}</div>
            </div>
        </>
    )
}

export default BlogList
