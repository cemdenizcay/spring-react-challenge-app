import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import ChallengesPage from './pages/ChallengesPage'; 
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <NavigationBar />
            <div className="container py-4">
                 <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <ChallengesPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;