import React from 'react';
import style from './FormularioBase.module.scss';
import Botao from '../Botao';
import { PropsFormulario } from '../../types/formularioBase.type';
import { useRecoilState } from 'recoil';
import { listaMarcaAtom } from '../../atoms/listaMarcaAtom';
import { veiculoAtom } from '../../atoms/veiculoAtom';

export default function FormularioVeiculos<T>({
  campos,
  valores,
  setValores,
  onSubmit,
  tituloBotao = 'Salvar',
  tituloForm = ''
}: PropsFormulario<T>) {

  const [marcas, setMarcas] = useRecoilState(listaMarcaAtom);
  const [veiculo, setVeiculo] = useRecoilState(veiculoAtom);

  const handleChange = (campo: keyof T) =>
    (evento: React.ChangeEvent<HTMLInputElement>) => {
      setValores({ ...valores, [campo]: evento.target.value });
    };

  const handleChangeSelect = (campo: keyof T) =>
    (evento: React.ChangeEvent<HTMLSelectElement>) => {
      setValores({ ...valores, [campo]: evento.target.value });
    };

  return (
    <>
      <h1>{tituloForm}</h1>
      <form className={style.novoFormularioBase} onSubmit={onSubmit}>
        {campos.filter((campo) => (campo.nome !== 'id')).map((campo) => (
          <div className={style.inputContainer} key={String(campo.nome)}>
            <label htmlFor={String(campo.nome)}>{campo.label}</label>
            {campo.tipo === 'select'
              ?
              <select
                name={String(campo.nome)}
                id={String(campo.nome)}
                onChange={handleChangeSelect(campo.nome)}
                required={campo.required}
                value={veiculo.marcaId}
              >
                <option value=""></option>
                {marcas?.map((opcao) => (
                  <option key={opcao.id} value={opcao.id}>{opcao.nome}</option>)
                )
                }
              </select>
              :
              <input
                type={campo.tipo}
                name={String(campo.nome)}
                id={String(campo.nome)}
                placeholder={campo.placeholder}
                value={valores[campo.nome] as string}
                onChange={handleChange(campo.nome)}
                required={campo.required}
                readOnly={campo.readOnly}
              />
            }
          </div>
        ))}

        <div className={style.inputContainer}>
          <Botao>{tituloBotao}</Botao>
        </div>
      </form>
    </>
  );
}