import api from './api.service';
import { Marca } from '../types/marca.type';
import { getTokenAcesso } from '../utils/tokenAcesso';

export async function listarMarcas(): Promise<Marca[]> {
  const response = await api.get('marcas',
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    });
  return response.data;
}

export async function listarUmaMarca(id: string): Promise<Marca> {
  const response = await api.get(`marcas/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    });
  return response.data;
}
  
export async function cadastrarMarca(marca: Marca): Promise<void> {
  await api.post('marcas', {nome: marca.nome},
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    }).catch(error => {
    throw new Error(error.response.data.message);
  });
}

export async function modificarMarca(marca: Marca): Promise<void> {
  await api.put(`marcas/${marca.id}/`, {nome: marca.nome},
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    }).catch(error => {
    throw new Error(error.response.data.message);
  });
}

export async function excluirMarca(marcaExcluida: Marca): Promise<void> {
  await api.delete(`marcas/${marcaExcluida.id}`,
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    }
  ).catch(error => {
    throw new Error(error.response.data.message);
  });
}
