import React from 'react';
import FormularioBase from '../../components/FormularioBase/';
import { Usuario } from '../../types/usuario.type';
import { CampoFormulario } from '../../types/formularioBase.type';
import { cadastrarUsuario } from '../../services/usuario.service';
import { useRecoilState } from 'recoil';
import { usuarioAtom } from '../../atoms/usuarioAtom';

const campos = [
  { nome: 'nome', tipo: 'text', label: 'Nome', placeholder: 'Nome do usuário', required: true },
  { nome: 'email', tipo: 'email', label: 'Email', placeholder: 'Email do usuário', required: true },
  { nome: 'senha', tipo: 'password', label: 'Senha', required: true },
];

export default function CadastroUsuario() {
  const [usuario, setUsuario] = useRecoilState(usuarioAtom);

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    try {
      await cadastrarUsuario(usuario);
      alert('Usuário cadastrado!');
      setUsuario({ nome: '', email: '', senha: '' });
    } catch (err) {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <FormularioBase<Usuario>
      campos={campos as CampoFormulario<Usuario>[]}
      valores={usuario}
      setValores={setUsuario}
      onSubmit={handleSubmit}
      tituloBotao="Cadastrar Usuário"
    />
  );
}
