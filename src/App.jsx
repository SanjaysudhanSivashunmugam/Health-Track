import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ECGPage from './pages/ECGPage';
import MiniProjectTeamPage from './pages/MiniProjectTeamPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ecg" element={<ECGPage />} />
          <Route path="/team" element={<MiniProjectTeamPage />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;