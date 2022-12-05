import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BlogList from 'pages/Blogs/List/BlogList'
import BlogView from 'pages/Blogs/View/BlogView'
import Profile from 'pages/Profile/Profile'
import Login from 'pages/Login/Login'
import BlogEdit from 'pages/Blogs/Edit/BlogEdit'
import Welcome from 'pages/Welcome/Welcome'
import 'index.css'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/blog/:id" element={<BlogView />}></Route>
                <Route path="/blog/:id/edit" element={<BlogEdit />}></Route>
                <Route path="/blog" element={<BlogList />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
    )
}

export default App
