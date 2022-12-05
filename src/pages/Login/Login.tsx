import { useState } from 'react'
import RequestLogin from 'requests/Auth/Login'
import { useCookies } from 'react-cookie'
import Header from 'pages/Header/Header'

const Login = () => {
    const [stateName, setName] = useState<string>('')
    const updateName = (event: any) => setName(event.target.value)

    const [statePasswd, setPasswd] = useState<string>('')
    const updatePasswd = (event: any) => setPasswd(event.target.value)

    const [stateErr, setErr] = useState<string>('')
    const [cookies, setCookie, removeCookie] = useCookies()

    const login = () => {
        RequestLogin(
            stateName,
            statePasswd,
            (res) => {
                setErr('')
                setCookie('portfolioToken', 'Bearer ' + res.data.token)
            },
            (err) => {
                setErr(
                    'error: ' +
                        err.message +
                        ' (' +
                        err.response.statusText +
                        ')',
                )
            },
        )
    }

    const logout = () => {
        removeCookie('portfolioToken')
    }

    return (
        <>
            <Header />
            <div className="page-base">
                <h1>管理者としてログイン</h1>
                <h3>ID・パスワードを入力してください</h3>

                {cookies.portfolioToken ? (
                    <div>
                        あなたはログイン中です。
                        <br />
                        <br />
                        <button onClick={logout}>Logout</button>
                        <br />
                    </div>
                ) : (
                    <div className="login-box">
                        <div>
                            管理者ID:&emsp;
                            <br />
                            パスワード:&emsp;
                            <br />
                            <button onClick={login}>Login</button>
                            <br />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={stateName}
                                onChange={updateName}
                            />
                            <br />
                            <input
                                type="password"
                                value={statePasswd}
                                onChange={updatePasswd}
                            />
                        </div>
                    </div>
                )}
                <div className="error">{stateErr}</div>
            </div>
        </>
    )
}

export default Login
