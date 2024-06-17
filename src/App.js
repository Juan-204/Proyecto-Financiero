import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Clientes from './components/Clientes';
import Creditos from './components/Creditos';
import Pagos from './components/Pagos';

function App() {
  return (
    <div className='contenedor'>
      <Router>
        <div className='app'>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path='/clientes' Component={Clientes}></Route>
            <Route path='/creditos' Component={Creditos}></Route>
            <Route path='/pagos/:numeroCredito' Component={Pagos}></Route> {/* Ruta modificada */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
