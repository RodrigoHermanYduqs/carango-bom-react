import { atom } from 'recoil';
import { Marca } from '../types/marca.type';

export const marcaAtom = atom<Marca>({
  key: 'marcaAtom',
  default: {
    id: '',
    nome: '',
  },
});
