import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/navBar';
import Login from './components/login';
import Register from './components/Register';
import Home from './components/Home';
import Services from './components/Services';
import Contacts from './components/Contacts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
