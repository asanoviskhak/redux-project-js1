import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import Movies from './pages/Movies';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import AddMovie from './pages/AddMovie';
import Details from './pages/Details';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebaseConfigs';
import { login, logout } from './store/slices/user'
import { useEffect } from 'react';
import Register from './pages/Register';
import EditMovie from './pages/EditMovie';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login({
          email: currentUser.email,
          uid: currentUser.uid
        }))
      }
      else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/movies/:movieId" element={<Details />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-movie/:movieId" element={<EditMovie />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
