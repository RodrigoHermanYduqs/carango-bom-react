import api from './api.service';
import { Veiculo } from '../types/veiculo.type';
import { getTokenAcesso } from '../utils/tokenAcesso';

export async function listarVeiculos(): Promise<Veiculo[]> {
  const response = await api.get('veiculos',
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    });
  return response.data;
}

export async function listarUmVeiculo(id: string): Promise<Veiculo> {
  const response = await api.get(`veiculos/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    });
  return response.data;
}

export async function cadastrarVeiculo(veiculo: Veiculo): Promise<void> {
  await api.post('veiculos/', {
    modelo: veiculo.modelo,
    valor: Number(veiculo.valor),
    ano: Number(veiculo.ano),
    marcaId: veiculo.marcaId
  },
  {
    headers: {
      Authorization: `Bearer ${getTokenAcesso()}`
    }
  }).catch(error => {
    throw new Error(error.response.data.message);
  });
}

export async function modificarVeiculo(veiculo: Veiculo): Promise<void> {
  await api.put(`veiculos/${veiculo.id}/`, {
    modelo: veiculo.modelo,
    valor: Number(veiculo.valor),
    ano: Number(veiculo.ano),
    marcaId: veiculo.marcaId
  },
  {
    headers: {
      Authorization: `Bearer ${getTokenAcesso()}`
    }
  }).catch(error => {
    throw new Error(error.response.data.message);
  });
}

export async function excluirVeiculo(veiculoExcluido: Veiculo): Promise<void> {
  await api.delete(`veiculos/${veiculoExcluido.id}`,
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    }
  ).catch(error => {
    throw new Error(error.response.data.message);
  });
}
