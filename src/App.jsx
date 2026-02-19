import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import Initiatives from './pages/Initiatives';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ClickSpark from './components/ClickSpark';
import './App.css';

function App() {
  return (
    <ClickSpark
      sparkColor="#e7e73eff"
      sparkSize={10}
      sparkRadius={25}
      sparkCount={10}
      duration={500}
    >
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClickSpark>
  );
}

export default App;
