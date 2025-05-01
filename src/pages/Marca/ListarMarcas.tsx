import { useEffect } from 'react';
import style from './Marca.module.scss';
import { useRecoilState } from 'recoil';
import { listaMarcaAtom } from '../../atoms/listaMarcaAtom';
import { excluirMarca, listarMarcas } from '../../services/marca.service';
import { Link, useNavigate } from 'react-router-dom';
import { Marca } from '../../types/marca.type';

export default function ListaMarcas() {
  const [marcas, setMarcas] = useRecoilState(listaMarcaAtom);

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
    try {
      const response = await excluirMarca(marcaExcluida);
      const listaMarcas = marcas.filter(marcas => marcas.id !== marcaExcluida.id);
      setMarcas([...listaMarcas]);
    }
    catch (err) {
      alert('Marca não pode ser excluída. Já existe um veículo associado.');
    }
  }

  return (
    <div className={style.listaMarcas}>
      <h1>Lista de Marcas</h1>
      {marcas.length > 0 ? (
        <table >
          <thead>
            <tr>
              <th>ID</th>
              <th>Marca</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marcas: any) => (
              <tr key={marcas.id}>
                <td style={{ textAlign: 'left', width: '40%' }}>
                  <Link className='App-link' to={`/marcas/cadastro/${marcas.id}`}>{marcas.id}</Link>
                </td>
                <td style={{ textAlign: 'left', width: '40%' }}>{marcas.nome}</td>
                <td style={{ textAlign: 'center', width: '20%' }}>
                  <button className='botao' onClick={() => excluir(marcas)}>{'< Excluir >'}</button>
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
  );
}
