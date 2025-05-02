import { Link, useNavigate } from 'react-router-dom';
import styles from './Menu.module.scss';
import { useAuth } from '../../contexts/authContext';

export default function Menu() {
  const { logout, estaAutenticado } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.menu}>
      <ul>
        {estaAutenticado && (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/veiculos/cadastro">Cadastrar Veículos</Link>
            </li>
            <li>
              <Link to="/veiculos">Lista de Veículos</Link>
            </li>
            <li>
              <Link to="/marcas/cadastro">Cadastrar Marcas</Link>
            </li>
            <li>
              <Link to="/marcas">Lista de Marcas</Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Sair
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
