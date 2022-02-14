import React from 'react'; 
import {Route, Routes, BrowserRouter} from 'react-router-dom'; 
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage'; 
import WritePage from './pages/WritePage'; 
import PostPage from './pages/PostPage'; 

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="@:username" element={<PostListPage/>} />
          <Route path="" element={<PostListPage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage/>} />
          <Route path="write" element={<WritePage/>} />
          <Route path="@:username/:postId" element={<PostPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;


/*
*/