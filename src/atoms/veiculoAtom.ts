import { atom } from 'recoil';
import { Veiculo } from '../types/veiculo.type';

export const veiculoAtom = atom<Veiculo>({
  key: 'veiculoAtom',
  default: {
    id: '',
    modelo: '',
    ano: '',
    valor: 0,
    marcaId: '',
  },
});
