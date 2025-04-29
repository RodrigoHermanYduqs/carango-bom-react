import { useEffect } from 'react';
import style from './Marca.module.scss';
import { useRecoilState } from 'recoil';
import { listaVeiculoAtom } from '../../atoms/listaVeiculoAtom';
import { listarVeiculos } from '../../services/veiculo.service';

export default function ListaVeiculos() {
  const [veiculos, setVeiculos] = useRecoilState(listaVeiculoAtom);

  useEffect(() => {
    async function carregarVeiculos() {
      try {
        const response = await listarVeiculos();
        setVeiculos(response);
      } catch (error) {
        alert('Erro ao carregar veiculos');
        console.error(error);
      }
    }

    carregarVeiculos();
  }, [setVeiculos]);

  return (
    <div className={style.listaVeiculos}>
      <h1>Lista de Veiculos</h1>
      {veiculos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculos: any) => (
              <tr key={veiculos.id}>
                <td>{veiculos.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={style.emptyState}>Nenhuma veiculo cadastrado.</p>
      )}
    </div>
  );
}
