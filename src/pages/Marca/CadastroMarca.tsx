import React, { useEffect } from 'react';
import FormularioBase from '../../components/FormularioBase/';
import { CampoFormulario } from '../../types/formularioBase.type';
import { useRecoilState } from 'recoil';
import { cadastrarMarca, modificarMarca, listarUmaMarca } from '../../services/marca.service';
import { marcaAtom } from '../../atoms/marcaAtom';
import { Marca } from '../../types/marca.type';
import { useParams, useNavigate } from 'react-router-dom';
import { getByPlaceholderText } from '@testing-library/dom';
import { AxiosError } from 'axios';

const campos = [
  { nome: 'id', tipo: 'text', label: 'id', placeholder: 'ID', required: false, readOnly: true },
  { nome: 'nome', tipo: 'text', label: 'Nome', placeholder: 'Digite a Marca', required: true, maxLength: 50 },
];

export default function CadastroMarca() {
  const parametros = useParams();
  const navegar = useNavigate();
  const [marca, setMarca] = useRecoilState(marcaAtom);

  useEffect(() => {

    const carregarMarca = async () => {
      try {
        if (parametros.id) {
          const response = await listarUmaMarca(parametros.id);
          setMarca({
            id: response.id,
            nome: response.nome
          });

        }
        else{
          limparForm();
        }
      } catch (error) {
        alert('Marca não encontrada para alteração.');
        console.error(error);
      }
    };

    carregarMarca();
  },[parametros]);

  const handleSubmit = async (evento: React.FormEvent) => {

    evento.preventDefault();

    try {
      if (!marca.id) {
        await cadastrarMarca(marca);
        alert('Marca cadastrada com sucesso!');
      }
      else {
        await modificarMarca(marca);
        alert('Marca atualizada com sucesso!');
      }

      limparForm();

      navegar('/marcas');
    } catch (err) {
      alert('Erro ao salvar marca: ' + (err as Error).message);
    }
  };

  const limparForm = () =>{
    setMarca({
      id: '',
      nome: ''
    });
  };

  return (
    <FormularioBase<Marca>
      campos={campos as CampoFormulario<Marca>[]}
      valores={marca}
      setValores={setMarca}
      onSubmit={handleSubmit}
      tituloBotao="Salvar"
      tituloForm={(marca.id === '' ? 'Incluir' : 'Editar') + ' Marca'}
    />
  );
}