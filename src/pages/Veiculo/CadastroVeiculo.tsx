import React from 'react';
import FormularioBase from '../../components/FormularioBase';
import { Veiculo } from '../../types/veiculo.type';
import { CampoFormulario } from '../../types/formularioBase.type';
import { useRecoilState } from 'recoil';
import { veiculoAtom } from '../../atoms/veiculoAtom';
import { marcaAtom } from '../../atoms/marcaAtom';
import { cadastrarVeiculo } from '../../services/veiculo.service';


const campos = [
  { nome: 'idMarca', tipo: 'select', label: 'Marca', placeholder: '', required: true},
  { nome: 'id', tipo: 'hidden', label: 'id', placeholder: '', required: false},
  { nome: 'modelo', tipo: 'text', label: 'Modelo', placeholder: 'modelo do veículo', required: true },
  { nome: 'ano', tipo: 'text', label: 'Ano', placeholder: 'Ano do Veículo', required: true },
  { nome: 'valor', tipo: 'text', label: 'valor', required: true },
];

export default function CadastroVeiculo() {
  const [veiculo, setVeiculo] = useRecoilState(veiculoAtom);
  //const [marcas, setMarcas] = useRecoilState(marcaAtom);

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    try {
      await cadastrarVeiculo(veiculo);
      alert('Veículo cadastrado!');
      setVeiculo({id: '', modelo: '', ano: '', valor: 0, marcaId: '' });
    } catch (err) {
      alert('Erro ao cadastrar veículo');
    }
  };

  return (
    <FormularioBase<Veiculo>
      campos={campos as CampoFormulario<Veiculo>[]}
      valores={veiculo}
      setValores={setVeiculo}
      onSubmit={handleSubmit}
      tituloBotao="Cadastrar Veículo"
    />
  );
  
}