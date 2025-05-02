import React from 'react';
import style from './FormularioBase.module.scss';
import Botao from '../Botao';
import { PropsFormulario } from '../../types/formularioBase.type';

export default function FormularioBase<T>({
  campos,
  valores,
  setValores,
  onSubmit,
  tituloBotao = 'Salvar',
  tituloForm = ''
}: PropsFormulario<T>) {
  const handleChange = (campo: keyof T) =>
    (evento: React.ChangeEvent<HTMLInputElement>) => {
      setValores({ ...valores, [campo]: evento.target.value });
    };

  return (
    <>
      <h1>{tituloForm}</h1>
      <form className={style.novoFormularioBase} onSubmit={onSubmit}>
        {campos.filter((campo) => (campo.nome !== 'id')).map((campo) => (
          <div className={style.inputContainer} key={String(campo.nome)}>
            <label htmlFor={String(campo.nome)}>{campo.label}</label>
            <input
              type={campo.tipo}
              name={String(campo.nome)}
              id={String(campo.nome)}
              placeholder={campo.placeholder}
              value={valores[campo.nome] as string}
              onChange={handleChange(campo.nome)}
              required={campo.required}
              readOnly={campo.readOnly}
              maxLength={campo.maxLength}
            />
          </div>
        ))}

        {campos.filter((campo) => (campo.nome === 'id')).map((campo) => (
          <div className={style.inputContainer} key={String(campo.nome)}>
            <input
              type='hidden'
              name={String(campo.nome)}
              id={String(campo.nome)}
              value={valores[campo.nome] as string}
              onChange={handleChange(campo.nome)}
              required={campo.required}
              readOnly={campo.readOnly}
            />
          </div>
        ))}

        <div className={style.inputContainer}>
          <Botao>{tituloBotao}</Botao>
        </div>
      </form>
    </>
  );
}