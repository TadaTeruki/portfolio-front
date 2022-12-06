import TagList from '../../components/TagList'
import { useNavigate } from 'react-router-dom'
import BlogTimestamp from '../../components/Timestamp'

const List = (props: {
    articles: any
    keywords: string[]
    onPushTag: (tag: string) => void
}) => {
    var top_items: any = []
    var other_items: any = []
    const navigate = useNavigate()

    for (let i = 0; i < props.articles.length; i++) {
        const tags = props.articles[i].tags

        const item = (
            <div
                className="blog-list"
                onClick={() => {
                    navigate(props.articles[i].id)
                }}
            >
                {props.articles[i].is_public ? (
                    <></>
                ) : (
                    <div className="blog-list-is-private">
                        非公開記事{' '}
                        <span style={{ fontSize: 'small' }}>
                            (見つけたら@PerukiFUNまで)
                        </span>
                    </div>
                )}
                <h3>{props.articles[i].title}</h3>
                <p>{props.articles[i].subtitle}</p>
                <BlogTimestamp
                    raw={props.articles[i].created_at}
                    withTime={false}
                    label={'記事作成日'}
                />
                <br />
                <TagList
                    key={props.articles[i].id}
                    tags={tags}
                    onPushTag={props.onPushTag}
                />
            </div>
        )

        var is_top_item = true

        for (let ik = 0; ik < props.keywords.length; ik++) {
            var satisfy = false
            for (let it = 0; it < tags.length; it++) {
                if (
                    !satisfy &&
                    (props.keywords[ik] === tags[it] ||
                        props.keywords[ik] === '#' + tags[it])
                )
                    satisfy = true
            }
            if (
                !satisfy &&
                props.articles[i].title.includes(props.keywords[ik])
            )
                satisfy = true
            if (
                !satisfy &&
                props.articles[i].subtitle.includes(props.keywords[ik])
            )
                satisfy = true

            is_top_item = is_top_item && satisfy
        }

        if (is_top_item) {
            top_items.push(item)
        } else {
            other_items.push(item)
        }
    }

    if (props.keywords.length === 1 && props.keywords[0] === '') {
        return (
            <>
                <h3>新しい順</h3>
                {top_items}
            </>
        )
    } else {
        return (
            <>
                <h3>検索結果</h3>

                {top_items.length === 0 ? (
                    <p className="warning">記事が見つかりませんでした。</p>
                ) : (
                    <>{top_items}</>
                )}

                <h3 className="blog-list-search-result">
                    その他の記事 (新しい順)
                </h3>

                {other_items.length === 0 ? (
                    <p className="warning">
                        すべての記事が検索結果に該当しています。
                    </p>
                ) : (
                    <>{other_items}</>
                )}
            </>
        )
    }
}

export default List
