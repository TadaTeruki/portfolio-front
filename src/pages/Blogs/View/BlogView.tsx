import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import ViewBox from './ViewBox'
import Header from 'pages/Header/Header'
import RequestCheckAuth from 'requests/Auth/CheckAuth'
import RequestReadArticle from 'requests/Article/ReadArticle'
import RequestDeleteArticle from 'requests/Article/DeleteArticle'
import BlogTimestamp from 'pages/components/Timestamp'

const BlogView = () => {
    const { id } = useParams()
    const id_str = id ? id : ''

    const [stateErr, setErr] = useState<string>('')
    const [stateCheckDelete, setCheckDelete] = useState<boolean>(false)
    const [stateArticle, setArticle] = useState<any>(null)
    const [cookies] = useCookies()
    const token = cookies.portfolioToken
    const navigate = useNavigate()
    const [stateAuth, setAuth] = useState<boolean>(false)

    useEffect(() => {
        RequestCheckAuth(
            token,
            () => {
                setAuth(true)
            },
            () => {},
        )

        RequestReadArticle(
            { id: id_str },
            (res) => {
                setArticle(res)
            },
            (message) => {
                setErr(message)
            },
        )
    }, [id_str, token])

    const deleteArticle = () => {
        RequestDeleteArticle(
            token,
            id_str,
            () => {
                navigate('/blog')
            },
            (message) => {
                setErr(message)
            },
        )
    }

    return (
        <>
            <Header />
            <div className="page-base blog-view-base">
                <button
                    onClick={() => {
                        navigate('/blog')
                    }}
                >
                    リストに戻る
                </button>
                &emsp;
                {stateAuth ? (
                    <>
                        <button
                            onClick={() => {
                                navigate('/blog/' + id + '/edit')
                            }}
                        >
                            編集
                        </button>
                        &emsp;
                        <button
                            className="button-danger"
                            onClick={() => {
                                setCheckDelete(true)
                            }}
                        >
                            削除
                        </button>
                        {stateCheckDelete ? (
                            <>
                                <br />
                                <br />
                                本当に削除しますか？
                                <br />
                                <button
                                    className="button-danger"
                                    onClick={deleteArticle}
                                >
                                    はい
                                </button>
                                &emsp;
                                <button
                                    onClick={() => {
                                        setCheckDelete(false)
                                    }}
                                >
                                    いいえ
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <></>
                )}
                {stateArticle == null ? (
                    <p>記事取得中...</p>
                ) : (
                    <ViewBox
                        article={stateArticle}
                        tag_click={true}
                        showTimestamp={true}
                    />
                )}
                <div className="error">{stateErr}</div>
                <div className="blog-view-footer">
                    <h2>Peruki's portfolio</h2>
                    <p>記事作成者: 多田 瑛貴 Teruki TADA</p>
                    {stateArticle == null ? (
                        <></>
                    ) : (
                        <>
                            <BlogTimestamp
                                raw={stateArticle.created_at}
                                withTime={true}
                                label={'記事作成日'}
                            />
                            <br />
                            <BlogTimestamp
                                raw={stateArticle.updated_at}
                                withTime={true}
                                label={'最終更新日'}
                            />
                            <br />
                        </>
                    )}
                </div>
                <button
                    onClick={() => {
                        navigate('/blog')
                    }}
                >
                    リストに戻る
                </button>
            </div>
        </>
    )
}

export default BlogView
