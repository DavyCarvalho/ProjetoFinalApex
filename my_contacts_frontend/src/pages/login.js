import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RiContactsBookLine } from 'react-icons/ri';

import { login } from '../services/apiService'; // Importação da função de login da API
import ErrorMessage from '../components/errorMessage'; // Importação do componente ErrorMessage
import UserRegisterModal from '../components/userRegisterModal'; // Importação do componente UserRegisterModal

import '../styles/pages/login.css'; // Importação do arquivo de estilos CSS específico para a página de login

export default function Login() {
  const [email, setEmail] = useState(''); // Estado para armazenar o valor do campo de e-mail
  const [password, setPassword] = useState(''); // Estado para armazenar o valor do campo de senha
  const [buttonDisabled, setButtonDisabled] = useState(true); // Estado para habilitar/desabilitar o botão de login
  const [registerModalIsVisible, setRegisterModalIsVisible] = useState(false); // Estado para controlar a visibilidade do modal de registro
  const [requestErrorMessage, setRequestErrorMessage] = useState(); // Estado para armazenar a mensagem de erro da requisição

  const pageRouter = useHistory(); // Instância do hook useHistory para manipular o histórico de navegação

  async function callApiToAuthenticateUser() {
    const { apiResponse } = await login({ email, password }); // Chama a API para autenticar o usuário com as credenciais fornecidas

    if (apiResponse.errorMessage != null) {
      setRequestErrorMessage(apiResponse.errorMessage); // Define a mensagem de erro da requisição
    } else {
      localStorage.setItem('token', apiResponse.data.toString()); // Armazena o token de autenticação no localStorage

      pageRouter.push('/home'); // Redireciona o usuário para a página principal (home)
    }
  }

  useEffect(() => {
    const emailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (emailRegex.test(email) && password.length >= 3) {
      setButtonDisabled(false); // Habilita o botão de login se o e-mail e a senha atenderem aos critérios
    } else {
      setButtonDisabled(true); // Desabilita o botão de login
    }
  }, [email, password]);

  return (
    <div className="container-login"> {/* Container principal da página */}
      <div className="container-login-header"> {/* Container do cabeçalho */}
        <h4 className="project-name">MyContacts</h4> {/* Nome do projeto */}
        <RiContactsBookLine className="icon-login" /> {/* Ícone do livro de contatos */}
      </div>
      <div className="email-input"> {/* Campo de entrada de e-mail */}
        E-mail:
        <input
          placeholder="csharp@email.com"
          className="form-control"
          onChange={(event) => { setEmail(event.target.value) }} // Atualiza o estado do e-mail ao digitar no campo
        />
      </div>
      <div className="password-input"> {/* Campo de entrada de senha */}
        Senha:
        <input
          type="password"
          placeholder="***********"
          className="form-control"
          onChange={(event) => { setPassword(event.target.value) }} // Atualiza o estado da senha ao digitar no campo
        />
      </div>
      <div className="container-login-buttons"> {/* Container dos botões */}
        <button
          className="btn btn-dark button" // Estilo CSS para o botão de login
          disabled={buttonDisabled} // Habilita/desabilita o botão de acordo com o estado do botãoDisabled
          onClick={callApiToAuthenticateUser} // Função para realizar a autenticação do usuário ao clicar no botão
        >
          Entrar
        </button>
        <div className="divider-line"></div> {/* Linha divisória */}
        <button
          className="btn btn-dark button" // Estilo CSS para o botão de criar conta
          onClick={() => setRegisterModalIsVisible(true)} // Função para exibir o modal de registro ao clicar no botão
        >
          Criar conta
        </button>
        {registerModalIsVisible ? ( // Verifica se o modal de registro está visível
          <UserRegisterModal closeModal={() => setRegisterModalIsVisible(false)} /> // Componente de modal de registro
        ) : null}
      </div>
      <ErrorMessage requestErrorMessage={requestErrorMessage} /> {/* Exibe a mensagem de erro da requisição, se houver */}
    </div>
  );
}