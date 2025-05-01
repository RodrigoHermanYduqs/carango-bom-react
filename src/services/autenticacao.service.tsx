import api from './api.service';
import { Autenticacao } from '../types/autenticacao.type';
import {RespostaAutenticacao} from '../interfaces/IRespostaAutenticacao';

export async function realizarLogin(dados: Autenticacao): Promise<RespostaAutenticacao> {
  const response = await api.post<RespostaAutenticacao>('autenticacao/login/', dados);
  return response.data;
}
