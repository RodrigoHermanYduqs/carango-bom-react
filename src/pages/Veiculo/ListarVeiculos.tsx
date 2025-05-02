import { useEffect } from 'react';
import style from './Veiculo.module.scss';
import { useRecoilState } from 'recoil';
import { listaVeiculoAtom } from '../../atoms/listaVeiculoAtom';
import { excluirVeiculo, listarVeiculos } from '../../services/veiculo.service';
import { Veiculo } from '../../types/veiculo.type';
import { listaMarcaAtom } from '../../atoms/listaMarcaAtom';
import { listarMarcas } from '../../services/marca.service';
import { useNavigate } from 'react-router-dom';
import { formatarMoeda } from '../../utils/formataMoeda';

export default function ListaVeiculos() {
  const [veiculos, setVeiculos] = useRecoilState(listaVeiculoAtom);
  const [marcas, setMarcas] = useRecoilState(listaMarcaAtom);

  const navEditar = useNavigate();

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

    if (!confirm('Deseja realmente excluir este Veículo?'))
      return;

    try {
      const response = await excluirVeiculo(veiculoExcluido);
      alert('Veículo excluído com sucesso!');
      const listaVeiculos = veiculos.filter(veiculos => veiculos.id !== veiculoExcluido.id);
      setVeiculos([...listaVeiculos]);
    }
    catch (err) {
      alert('Erro ao excluir veiculo: ' + (err as Error).message);
    }
  }

  function buscarNomeMarca(idProcurado: string): string | undefined {
    const marcaEncontrada = marcas.find(marca => marca.id === idProcurado);
    return marcaEncontrada?.nome;
  }

  return (
    <>
      <h1>Lista de Veiculos</h1>
      <div className={style.listaVeiculos}>
        {veiculos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
                <th>Valor</th>
                <th colSpan={2} style={{ textAlign: 'center'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map((veiculos: any) => (
                <tr key={veiculos.id}>
                  <td>{buscarNomeMarca(veiculos.marcaId)}</td>
                  <td>{veiculos.modelo}</td>
                  <td>{veiculos.ano}</td>
                  <td>{formatarMoeda(veiculos.valor)}</td>
                  <td style={{ textAlign: 'center', width: '20%' }}>
                    <button className='botao' onClick={() => navEditar(`/veiculos/cadastro/${veiculos.id}`)}>{'Alterar'}</button>
                  </td>
                  <td style={{ textAlign: 'center', width: '20%' }}>
                    <button className='botao' onClick={() => excluir(veiculos)}>{'Excluir'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={style.emptyState}>Nenhuma veiculo cadastrado.</p>
        )}
      </div>
    </>
  );
}
