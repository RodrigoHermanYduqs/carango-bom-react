import React from 'react';
import FormularioBase from '../../components/FormularioBase';
import { CampoFormulario } from '../../types/formularioBase.type';
import { useRecoilState } from 'recoil';
import { cadastrarMarca, modificarMarca } from '../../services/marca.service';
import { marcaAtom } from '../../atoms/marcaAtom';
import { Marca } from '../../types/marca.type';
import { useParams, useNavigate } from 'react-router-dom';

const campos = [
  { nome: 'nome', tipo: 'text', label: 'nome', placeholder: 'Digite a Marca', required: true },
];

export default function CadastroMarca() {
  const parametros = useParams();
  const [marca, setMarca] = useRecoilState(marcaAtom);

  const handleSubmit = async (evento: React.FormEvent) => {
    
    evento.preventDefault();
    try {
      if (!parametros.id){
        await cadastrarMarca(marca);
        alert('Marca cadastrada!');
      }
      else{
        await modificarMarca(marca);
        alert('Marca atualizada!');
      }
      
      setMarca({ 
        id: '', 
        nome: '' });
    } catch (err) {
      alert('Erro ao cadastrar marca');
    }
  };

  return (
    <FormularioBase<Marca>
      campos={campos as CampoFormulario<Marca>[]}
      valores={marca}
      setValores={setMarca}
      onSubmit={handleSubmit}
      tituloBotao="Cadastrar Marcas"
    />
  );
}