import React, { useEffect } from 'react';
import FormularioBase from '../../components/FormularioBase';
import { Veiculo } from '../../types/veiculo.type';
import { CampoFormulario } from '../../types/formularioBase.type';
import { useRecoilState } from 'recoil';
import { veiculoAtom } from '../../atoms/veiculoAtom';
import { marcaAtom } from '../../atoms/marcaAtom';
import { cadastrarVeiculo, listarUmVeiculo, modificarVeiculo } from '../../services/veiculo.service';
import { useNavigate, useParams } from 'react-router-dom';


const campos = [
  { nome: 'id', tipo: 'text', label: 'id', placeholder: '', required: false, readonly: true },
  { nome: 'marcaId', tipo: 'text', label: 'Marca', placeholder: '', required: true },
  { nome: 'modelo', tipo: 'text', label: 'Modelo', placeholder: 'modelo do veículo', required: true },
  { nome: 'valor', tipo: 'text', label: 'Valor', required: true },
  { nome: 'ano', tipo: 'text', label: 'Ano', placeholder: 'Ano do Veículo', required: true },
];

export default function CadastroVeiculo() {
  const navegar = useNavigate();
  const parametros = useParams();
  const [veiculo, setVeiculo] = useRecoilState(veiculoAtom);
  //const [marcas, setMarcas] = useRecoilState(marcaAtom);


  useEffect(() => {
    const carregarVeiculo = async () => {
      try {
        if (parametros.id) {
          const response = await listarUmVeiculo(parametros.id);

          setVeiculo({
            id: response.id,
            modelo: response.modelo,
            ano: response.ano,
            valor: response.valor,
            marcaId: response.marcaId
          });

        }
      } catch (error) {
        alert('Marca não encontrada para alteração.');
        console.error(error);
      }
    };

    carregarVeiculo();
  }, [parametros]);

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    try {
      if (!veiculo.id) {
        await cadastrarVeiculo(veiculo);
        alert('Veículo cadastrado!');
      }
      else{
        await modificarVeiculo(veiculo);
        alert('Veículo modificado!');
      }
      setVeiculo({ 
        id: '', 
        modelo: '', 
        ano: 0, 
        valor: 0, 
        marcaId: '' 
      });
      navegar('/veiculos');
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