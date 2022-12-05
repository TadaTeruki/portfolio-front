import Header from 'pages/Header/Header'
import { useNavigate } from 'react-router-dom'
import ImagePairBox from 'pages/components/ImagePairBox'

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div className="page-base markdown-base">
                <ImagePairBox image="https://lh3.googleusercontent.com/KpwSxbqAkan423hgr3rT5JDMjMNKbRYefJidweh392mILwiaouLcdwxxI5NmmoTTi0w=w2400">
                    <h1>Peruki's portfolio</h1>
                    <p>
                        ぺるきのポートフォリオです。
                        <br />
                        様々な情報を共有します。
                    </p>
                    <h2
                        onClick={() => {
                            navigate('/profile')
                        }}
                        className="clickable-header"
                    >
                        {' '}
                        Profile{' '}
                    </h2>
                    <p>
                        所属・技術スタックなど、ぺるきに関する主な情報を載せています。
                    </p>
                    <h2
                        onClick={() => {
                            navigate('/blog')
                        }}
                        className="clickable-header"
                    >
                        {' '}
                        Blog{' '}
                    </h2>
                    <p>技術や生活に関する記事を載せています。</p>
                </ImagePairBox>
            </div>
        </>
    )
}

export default Welcome
