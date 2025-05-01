import { useEffect } from 'react';
import style from './Veiculo.module.scss';
import { useRecoilState } from 'recoil';
import { listaVeiculoAtom } from '../../atoms/listaVeiculoAtom';
import { excluirVeiculo, listarVeiculos } from '../../services/veiculo.service';
import { Veiculo } from '../../types/veiculo.type';
import { listaMarcaAtom } from '../../atoms/listaMarcaAtom';
import { listarMarcas } from '../../services/marca.service';
import { Link } from 'react-router-dom';

export default function ListaVeiculos() {
  const [veiculos, setVeiculos] = useRecoilState(listaVeiculoAtom);
  const [marcas, setMarcas] = useRecoilState(listaMarcaAtom);

  useEffect(() => {
    async function carregarVeiculos() {
      try {
        const respVeiculo = await listarVeiculos();
        setVeiculos(respVeiculo);
      } catch (error) {
        alert('Erro ao carregar veiculos');
        console.error(error);
      }
    }

    async function carregarMarcas() {
      try {
        const respMarca = await listarMarcas();
        setMarcas(respMarca);
      } catch (error) {
        alert('Erro ao carregar marcas');
        console.error(error);
      }
    }

    carregarVeiculos();
    carregarMarcas();

  }, [setVeiculos, setMarcas]);

  async function excluir(veiculoExcluido: Veiculo) {
    try {
      const response = await excluirVeiculo(veiculoExcluido);
      const listaVeiculos = veiculos.filter(veiculos => veiculos.id !== veiculoExcluido.id);
      setVeiculos([...listaVeiculos]);
    }
    catch (err) {
      alert('Erro ao excluir veiculo');
    }
  }

  function buscarNomeMarca(idProcurado: string): string | undefined {
    const marcaEncontrada = marcas.find(marca => marca.id === idProcurado);
    return marcaEncontrada?.nome;
  }

  return (
    <div className={style.listaVeiculos}>
      <h1>Lista de Veiculos</h1>
      {veiculos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Ano</th>
              <th>Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculos: any) => (
              <tr key={veiculos.id}>
                <td style={{ textAlign: 'left', width: '40%' }}>
                  <Link className='App-link' to={`/veiculos/cadastro/${veiculos.id}`}>{veiculos.id}</Link>
                </td>
                <td>{buscarNomeMarca(veiculos.marcaId)}</td>
                <td>{veiculos.modelo}</td>
                <td>{veiculos.ano}</td>
                <td>{veiculos.valor}</td>
                <td>
                  <button className='botao' onClick={() => excluir(veiculos)}>{'< Excluir >'}</button>
                </td>
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
