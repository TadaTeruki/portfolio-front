import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import ViewBox from '../View/ViewBox'
import RequestCheckAuth from 'requests/Auth/CheckAuth'
import RequestReadArticle from 'requests/Article/ReadArticle'
import RequestUpdateArticle from 'requests/Article/UpdateArticle'

const BlogEdit = () => {
    const { id } = useParams()
    const id_str = id ? id : ''

    const [stateErr, setErr] = useState<string>('')
    const [cookies] = useCookies()
    const token = cookies.portfolioToken
    const navigate = useNavigate()
    const [stateNewTitle, setNewTitle] = useState<string>('')
    const updateNewTitle = (event: any) => setNewTitle(event.target.value)

    const [stateNewSubtitle, setNewSubtitle] = useState<string>('')
    const updateNewSubtitle = (event: any) => setNewSubtitle(event.target.value)

    const [stateNewBody, setNewBody] = useState<string>('')
    const updateNewBody = (event: any) => setNewBody(event.target.value)

    const [stateNewTags, setNewTags] = useState<string>('')
    const updateNewTags = (event: any) => setNewTags(event.target.value)

    const [stateNewIsPublic, setNewIsPublic] = useState<boolean>(false)
    const updateNewIsPublic = () => setNewIsPublic(!stateNewIsPublic)

    useEffect(() => {
        RequestCheckAuth(
            token,
            () => {
                RequestReadArticle(
                    { id: id_str },
                    (res) => {
                        setNewTitle(res.title)
                        setNewSubtitle(res.subtitle)
                        setNewBody(res.body)
                        setNewIsPublic(res.is_public)

                        var newTags = ''
                        if (res.tags.length >= 0) {
                            newTags = res.tags[0]
                            for (let i = 1; i < res.tags.length; i++) {
                                newTags += ' ' + res.tags[i]
                            }
                        }
                        setNewTags(newTags)
                    },
                    (message) => {
                        setErr(message)
                    },
                )
            },
            (message) => {
                setErr(message)
            },
        )
    }, [id_str, token])

    const updateArticle = () => {
        RequestUpdateArticle(
            token,
            id_str,
            {
                title: stateNewTitle,
                subtitle: stateNewSubtitle,
                body: stateNewBody,
                tags: stateNewTags.split(' '),
                is_public: stateNewIsPublic,
            },
            () => {
                navigate('/blog/' + id_str)
            },
            (message) => {
                setErr(message)
            },
        )
    }

    return (
        <div className="page-base-wide">
            <div className="blog-edit-base">
                <div className="blog-edit-box">
                    <h1>記事を編集</h1>
                    <p className="blog-edit-label">
                        タイトル
                        <input
                            type="text"
                            className="blog-text-entry blog-edit-text-entry"
                            value={stateNewTitle}
                            onChange={updateNewTitle}
                        />
                    </p>

                    <p className="blog-edit-label">
                        説明文
                        <input
                            type="text"
                            className="blog-text-entry blog-edit-text-entry"
                            value={stateNewSubtitle}
                            onChange={updateNewSubtitle}
                        />
                    </p>

                    <p className="blog-edit-label">
                        タグ (空白で区切る)
                        <input
                            type="text"
                            className="blog-text-entry blog-edit-text-entry"
                            value={stateNewTags}
                            onChange={updateNewTags}
                        />
                    </p>

                    <p className="blog-edit-label">本文</p>
                    <textarea
                        className="blog-text-entry blog-edit-text-area"
                        value={stateNewBody}
                        onChange={updateNewBody}
                    />
                </div>
                <div className="blog-edit-preview-box">
                    <ViewBox
                        article={{
                            title: stateNewTitle,
                            subtitle: stateNewSubtitle,
                            body: stateNewBody,
                            tags: stateNewTags.split(' '),
                        }}
                        tag_click={false}
                        showTimestamp={false}
                    />
                </div>
            </div>
            <div className="error">{stateErr}</div>
            <button className="blog-edit-button" onClick={updateArticle}>
                更新
            </button>
            <input
                type="checkbox"
                checked={stateNewIsPublic}
                onChange={updateNewIsPublic}
            />{' '}
            公開する
        </div>
    )
}

export default BlogEdit
