import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Header from 'pages/Header/Header'
import SetDocumentTitle from 'packages/DocumentTitle/SetDocumentTitle'

const md = `
### 基本情報

#### 名前
多田 瑛貴 Teruki TADA

#### 所属
公立はこだて未来大学 システム情報科学部 

(2026年卒予定)

#### 主な活動領域
Web開発 - バックエンド (Go, Rust)

コンピュータグラフィックス - 手続き的地形生成

### アクセス

Twitter : <a href="https://twitter.com/PerukiFUN"> @PerukiFUN </a>

GitHub : <a href="https://github.com/TadaTeruki"> TadaTeruki </a>

![perukun](https://lh3.googleusercontent.com/KpwSxbqAkan423hgr3rT5JDMjMNKbRYefJidweh392mILwiaouLcdwxxI5NmmoTTi0w=w2400)
`

const Profile = () => {
    SetDocumentTitle('Profile')

    return (
        <>
            <Header />
            <div className="page-base markdown-base">
                <h2>Profile</h2>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={md} />
            </div>
        </>
    )
}

export default Profile
