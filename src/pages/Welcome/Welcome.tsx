import Header from 'pages/Header/Header'
import { useNavigate } from 'react-router-dom'
import ImagePairBox from 'pages/components/ImagePairBox'
import SetDocumentTitle from 'packages/DocumentTitle/SetDocumentTitle'

const Welcome = () => {
    SetDocumentTitle('Welcome!')

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div className="page-base markdown-base">
                <ImagePairBox image="https://lh3.googleusercontent.com/KpwSxbqAkan423hgr3rT5JDMjMNKbRYefJidweh392mILwiaouLcdwxxI5NmmoTTi0w=w2400">
                    <h2>Peruki's Portfolio</h2>
                    <p>
                        ぺるきのポートフォリオです。
                        <br />
                        様々な情報を共有します。
                        <br />
                        <br />
                    </p>
                    <h3
                        onClick={() => {
                            navigate('/profile')
                        }}
                        className="clickable-header"
                    >
                        Profile
                    </h3>
                    <p>
                        所属・技術スタックなど、ぺるきに関する主な情報を載せています。
                    </p>
                    <h3
                        onClick={() => {
                            navigate('/blog')
                        }}
                        className="clickable-header"
                    >
                        Blog
                    </h3>
                    <p>技術や生活に関する記事を載せています。</p>
                </ImagePairBox>
            </div>
        </>
    )
}

export default Welcome
