import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import ViewBox from './ViewBox'
import Header from 'pages/Header/Header'
import RequestCheckAuth from 'requests/Auth/CheckAuth'
import RequestReadArticle from 'requests/Article/ReadArticle'
import RequestDeleteArticle from 'requests/Article/DeleteArticle'
import BlogTimestamp from 'pages/components/Timestamp'
import SetDocumentTitle from 'packages/DocumentTitle/SetDocumentTitle'

const BlogView = () => {
    SetDocumentTitle('')

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
                SetDocumentTitle(res.title)
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
                {stateAuth ? (
                    <>
                        <button
                            onClick={() => {
                                navigate('/blog/' + id + '/edit')
                            }}
                        >
                            ??????
                        </button>
                        &emsp;
                        <button
                            className="button-danger"
                            onClick={() => {
                                setCheckDelete(true)
                            }}
                        >
                            ??????
                        </button>
                        {stateCheckDelete ? (
                            <>
                                <br />
                                <br />
                                ??????????????????????????????
                                <br />
                                <button
                                    className="button-danger"
                                    onClick={deleteArticle}
                                >
                                    ??????
                                </button>
                                &emsp;
                                <button
                                    onClick={() => {
                                        setCheckDelete(false)
                                    }}
                                >
                                    ?????????
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
                    <p>???????????????...</p>
                ) : (
                    <ViewBox
                        article={stateArticle}
                        tag_click={true}
                        showTimestamp={true}
                    />
                )}
                <div className="error">{stateErr}</div>
                <div className="blog-view-footer">
                    <h2>Peruki's Portfolio</h2>
                    <p>???????????????: ?????? ?????? Teruki TADA</p>
                    {stateArticle == null ? (
                        <></>
                    ) : (
                        <>
                            <BlogTimestamp
                                raw={stateArticle.created_at}
                                withTime={true}
                                label={'???????????????'}
                            />
                            <br />
                            <BlogTimestamp
                                raw={stateArticle.updated_at}
                                withTime={true}
                                label={'???????????????'}
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
                    ??????????????????
                </button>
            </div>
        </>
    )
}

export default BlogView
