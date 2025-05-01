import { useState } from 'react';
import FormularioBase from '../../components/FormularioBase/';
import { CampoFormulario } from '../../types/formularioBase.type';
import type { Autenticacao } from '../../types/autenticacao.type';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const camposAutenticacao = [
  { nome: 'email', tipo: 'email', label: 'Email', placeholder: 'Email do usuário', required: true },
  { nome: 'senha', tipo: 'password', label: 'Senha', required: true },
];

export default function Autenticacao() {
  const [autenticacao, setAutenticacao] = useState<Autenticacao>({ email: '', senha: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    try {
      const sucesso = await login(autenticacao);

      if (sucesso) {
        navigate('home');
      } else {
        alert('Token inválido!');
        navigate('/');
      }

      setAutenticacao({ email: '', senha: '' });
    } catch (err) {
      alert('Erro ao Logar');
      console.error(err);
    }
  };

  return (
    <FormularioBase<Autenticacao>
      campos={camposAutenticacao as CampoFormulario<Autenticacao>[]}
      valores={autenticacao}
      setValores={setAutenticacao}
      onSubmit={handleSubmit}
      tituloBotao="Entrar"
    />
  );
}