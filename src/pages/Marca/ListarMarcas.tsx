import { useEffect } from 'react';
import style from './Marca.module.scss';
import { useRecoilState } from 'recoil';
import { listaMarcaAtom } from '../../atoms/listaMarcaAtom';
import { excluirMarca, listarMarcas } from '../../services/marca.service';
import { useNavigate } from 'react-router-dom';
import { Marca } from '../../types/marca.type';

export default function ListaMarcas() {
  const [marcas, setMarcas] = useRecoilState(listaMarcaAtom);
  const navEditar = useNavigate();

  useEffect(() => {
    async function carregarMarcas() {
      try {
        const response = await listarMarcas();
        setMarcas(response);
      } catch (error) {
        alert('Erro ao carregar marcas');
        console.error(error);
      }
    }

    carregarMarcas();

  }, [setMarcas]);

  async function excluir(marcaExcluida: Marca) {

    if (!confirm('Deseja realmente excluir esta Marca?'))
      return;

    try {
      await excluirMarca(marcaExcluida);
      alert('Marca excluída com sucesso!');
      const listaMarcas = marcas.filter(marcas => marcas.id !== marcaExcluida.id);
      setMarcas([...listaMarcas]);
    }
    catch (err) {
      alert('Erro ao salvar marca: ' + (err as Error).message);
    }
  }

  return (
    <>
      <h1>Lista de Marcas</h1>
      <div className={style.listaMarcas}>
        {marcas.length > 0 ? (
          <table >
            <thead>
              <tr>
                <th>Marca</th>
                <th colSpan={2} style={{ textAlign: 'center'}}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {marcas.map((marcas: any) => (
                <tr key={marcas.id}>
                  <td style={{ textAlign: 'left', width: '60%' }}>{marcas.nome}</td>
                  <td style={{ textAlign: 'center', width: '20%' }}>
                    <button className='botao' onClick={() => navEditar(`/marcas/cadastro/${marcas.id}`)}>{'Alterar'}</button>
                  </td>
                  <td style={{ textAlign: 'center', width: '20%' }}>
                    <button className='botao' onClick={() => excluir(marcas)}>{'Excluir'}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={style.emptyState}>Nenhuma marca cadastrada.</p>
        )
        }
      </div >
    </>
  );
}
