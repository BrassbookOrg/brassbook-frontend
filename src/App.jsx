import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import Compositions from "./pages/compositions/Compositions.jsx";
import Favorites from './pages/favorites/Favorites.jsx';
import User from "./pages/user/User.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import Library from './pages/library/Library.jsx';
import LibrarySelected from "./pages/library/librarySelected/LibrarySelected.jsx";
import Publications from "./pages/publications/Publications.jsx";
import Publication from './pages/publications/publication/Publication.jsx';
import Admin from './pages/admin/Admin.jsx';
import AddNotes from './pages/admin/addNotes/AddNotes.jsx';
import AddMusic from './pages/admin/addMusic/AddMusic.jsx';
import { useDispatch } from 'react-redux';
import { $api } from './api/index.js';
import { setIsAuthorized, setUser } from './store/userSlice.js';




function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const checkAuthentication = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');

    let userData = null;
    const { data: user } = await $api.post('/v1/auth/check', {
      accessToken: accessToken,
    });
    userData = user;
    if (user?.errorCode) {
      const { data: updatedToken } = await $api.get('/v1/auth/refresh');
      if (updatedToken.errorCode) {
        // Only redirect to signin if the user is on /user or /compositions
        if (currentPath === '/user' || currentPath === '/compositions') {
          navigate('/signin');
        }
        return;
      }
      localStorage.setItem('token', updatedToken.accessToken);
      const { data: user } = await $api.post('/v1/auth/check', {
        accessToken: updatedToken.accessToken,
      });

      if (user?.errorCode) {
        // Only redirect to signin if the user is on /user or /compositions
        if (currentPath === '/user' || currentPath === '/compositions') {
          navigate('/signin');
        }
        return;
      }
      userData = user;
    }

    dispatch(setIsAuthorized(true));
    dispatch(setUser(userData.user));
  }, [dispatch, navigate, currentPath]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="compositions" element={<Compositions />} />
        <Route path="user" element={<User />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="library" element={<Library />} />
        <Route path="library/:id/:name" element={<LibrarySelected />} />
        <Route path="publications" element={<Publications />} />
        <Route path="publications/:id" element={<Publication />} />
        <Route path='adminPanel' element={<Admin />} />
        <Route path='adminPanel/addNotes' element={<AddNotes />}/>
        <Route path='adminPanel/addMusic' element={<AddMusic />}/>
      </Route>
    </Routes>
  );
}

export default App;