import api from './api.service';
import { Veiculo } from '../types/veiculo.type';
import { getTokenAcesso } from '../utils/tokenAcesso';

export async function listarVeiculos(): Promise<Veiculo[]> {
  const response = await api.get('/veiculos',
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    });
  return response.data;
}
  
export async function cadastrarVeiculo(veiculo: Veiculo): Promise<void> {
  await api.post('/veiculos', veiculo,
    {
      headers: {
        Authorization: `Bearer ${getTokenAcesso()}`
      }
    });
}