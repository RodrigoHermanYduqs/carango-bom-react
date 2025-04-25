import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import Autenticacao from '../pages/Autenticacao';
import RotaPrivada from '../components/RotaPrivada';
import CadastroVeiculo from './Veiculo/CadastroVeiculo';
import CadastroMarca from './Marca/CadastroMarca';
import ListaMarcas from './Marca/ListarMarcas';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Menu />
        <div>
          <h1>Bem-vindo(a) à nossa Loja Carango Bom!</h1>
          <p>Gerencie Veículos e Marcas de forma simples e eficiente.</p>
        </div>
        <Routes>
          <Route path='/' element={<Autenticacao />} />

          <Route path="/veiculos/cadastro" element={
            <RotaPrivada>
              <CadastroVeiculo />
            </RotaPrivada>
          } />

          <Route path="/marcas/cadastro" element={
            <RotaPrivada>
              <CadastroMarca />
            </RotaPrivada>
          } />

          <Route path="/marcas" element={
            <RotaPrivada>
              <ListaMarcas />
            </RotaPrivada>
          } />
          <Route path="*" element={<Autenticacao />} /> {}
        </Routes>
      </div>
    </Router>
  );
}
