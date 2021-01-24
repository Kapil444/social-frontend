import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Headers/Header';
import Routes from './routes';

function App() {
  return (
    <Router>
    <Header /> 
    <div className="container mt-5">
      <Routes />    
    </div>       
  </Router>
  );
}

export default App;
