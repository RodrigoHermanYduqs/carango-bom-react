import { atom } from 'recoil';
import { Veiculo } from '../types/veiculo.type';

export const veiculoAtom = atom<Veiculo>({
  key: 'veiculoAtom',
  default: {
    id: '',
    modelo: '',
    ano: 0,
    valor: 0,
    marcaId: '',
  },
});
