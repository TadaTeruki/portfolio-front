import Tab from './Tab'
import Logo from './Logo'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <div className="header-base">
            <div className="tab-container">
                <div onClick={() => navigate('/')}>
                    <Logo>Peruki's portfolio</Logo>
                </div>
                <div onClick={() => navigate('/profile')}>
                    <Tab>Profile</Tab>
                </div>
                <div onClick={() => navigate('/blog')}>
                    <Tab>Blog</Tab>
                </div>
            </div>
        </div>
    )
}

export default Header
