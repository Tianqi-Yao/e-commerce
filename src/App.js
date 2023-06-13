import './App.css';
import HomePage from './components/homePageComponent/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CartPage from './components/cartPageComponent/CartPage'
import LoginPage from './components/loginPageComponent/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
