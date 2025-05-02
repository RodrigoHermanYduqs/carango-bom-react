import React, { useEffect } from 'react';
import FormularioBase from '../../components/FormularioBase/FormularioVeiculos';
import { Veiculo } from '../../types/veiculo.type';
import { CampoFormulario } from '../../types/formularioBase.type';
import { useRecoilState } from 'recoil';
import { veiculoAtom } from '../../atoms/veiculoAtom';
import { cadastrarVeiculo, listarUmVeiculo, modificarVeiculo } from '../../services/veiculo.service';
import { useNavigate, useParams } from 'react-router-dom';
import { listarMarcas } from '../../services/marca.service';
import { listaMarcaAtom } from '../../atoms/listaMarcaAtom';


const campos = [
  { nome: 'id', tipo: 'text', label: 'id', placeholder: 'ID', required: false, readOnly: true },
  { nome: 'marcaId', tipo: 'select', label: 'Marca', placeholder: '', required: true },
  { nome: 'modelo', tipo: 'text', label: 'Modelo', placeholder: 'modelo do veículo', required: true },
  { nome: 'ano', tipo: 'number', label: 'Ano', placeholder: 'Ano do Veículo', required: true },
  { nome: 'valor', tipo: 'number', label: 'Valor', required: true },
];

export default function CadastroVeiculo() {
  const navegar = useNavigate();
  const parametros = useParams();
  const [veiculo, setVeiculo] = useRecoilState(veiculoAtom);
  const [marcas, setMarcas] = useRecoilState(listaMarcaAtom);


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
        else{
          limparForm();
        }
      } catch (error) {
        alert('Marca não encontrada para alteração.');
        console.error(error);
      }
    };

    const carregarMarcas = async () => {
      try {
        const responseMarcas = await listarMarcas();
        setMarcas(responseMarcas);

      } catch (error) {
        alert('Erro ao carregar marcas');
        console.error(error);
      }
    };

    carregarVeiculo();
    carregarMarcas();
  }, [parametros]);

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();

    try {
      if (!veiculo.id) {
        await cadastrarVeiculo(veiculo);
        alert('Veículo cadastrado com sucesso!');
      }
      else{
        await modificarVeiculo(veiculo);
        alert('Veículo modificado com sucesso!');
      }

      limparForm();

      navegar('/veiculos');
    } catch (err) {
      alert('Erro ao salvar veículo: ' + (err as Error).message);
    }
  }; 

  const limparForm = () => {
    setVeiculo({ 
      id: '', 
      modelo: '', 
      ano: 0, 
      valor: 0, 
      marcaId: '' 
    });
  };

  return (
    <FormularioBase<Veiculo>
      campos={campos as CampoFormulario<Veiculo>[]}
      valores={veiculo}
      setValores={setVeiculo}
      onSubmit={handleSubmit}
      tituloBotao="Salvar"
      tituloForm={(veiculo.id === '' ? 'Incluir' : 'Editar') + ' Veículo'}
    />
  );

}