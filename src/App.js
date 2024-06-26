import  Home from './pages/Home';
import  Login from './pages/Login';
import  Register from './pages/Register';
import './style.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { currentUser } from './App';

function App() {

  const {currentUser} = useContext(AuthContext);


  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<ProtectedRoute>
        <Home />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}
export default App;