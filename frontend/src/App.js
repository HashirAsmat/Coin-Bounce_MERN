import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Protected from './components/Protected/Protected';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Crypto from './pages/Crypto/Crypto';
import Blog from './pages/Blog/Blog';
import SubmitBlog from './pages/SubmitBlog/SubmitBlog';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import UpdateBlog from './pages/UpdateBlog/UpdateBlog';
import FavoriteApi from './pages/FavoriteApi/FavoriteApi';
function App() {
  const isAuth = useSelector((state)=>state.user.auth);
  return (  
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='crypto' element={<Protected isAuth={isAuth}><Crypto/> </Protected>} />
          <Route path='blogs' element={<Protected isAuth={isAuth}><Blog/></Protected>} />
          <Route path="blog/:id" element={<Protected isAuth={isAuth}><BlogDetails/></Protected>} />
          <Route path='submit' element={<Protected isAuth={isAuth}><SubmitBlog/></Protected>} />
          <Route path="blog-update/:id" element={<Protected isAuth={isAuth}><UpdateBlog/></Protected>} />
          <Route path="crypto/cryptofavorite" element={<Protected isAuth={isAuth}><FavoriteApi/></Protected>} />
          <Route path='sign-up' element={<Signup/>} />
          <Route path='log-in' element={<Login/>} />
          
          <Route path='*' element={<Error/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
