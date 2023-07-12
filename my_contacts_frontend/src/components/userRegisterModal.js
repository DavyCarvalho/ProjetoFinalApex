// userRegisterModal.js: Componente de modal para o registro de usuários

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createUser } from '../services/apiService'; // Importa função para criar um usuário na API
import ErrorMessage from './errorMessage'; // Importa componente para exibir mensagens de erro

import '../styles/components/genericModal.css'; // Importa os estilos CSS específicos para o modal

export default function UserRegisterModal({ closeModal }) {
  // Define os estados para armazenar os valores do formulário e a mensagem de erro da requisição
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requestErrorMessage, setRequestErrorMessage] = useState();

  // Função assíncrona para chamar a API e criar um usuário
  async function callApiToCreateUser() {
    const { apiResponse } = await createUser({ name, email, password }); // Chama a função createUser da API

    if (apiResponse.errorMessage != null) {
      // Verifica se ocorreu algum erro na resposta da API
      setRequestErrorMessage(apiResponse.errorMessage); // Define a mensagem de erro para exibir no componente ErrorMessage
    } else {
      closeModal(); // Fecha o modal
    }
  }

  // Efeito colateral para habilitar ou desabilitar o botão de salvar conforme os campos são preenchidos
  useEffect(() => {
    const strPassword = password.toString();
    const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (testEmail.test(email) && strPassword.length > 3 && name.length > 0) {
      setButtonDisabled(false); // Habilita o botão de salvar
    } else {
      setButtonDisabled(true); // Desabilita o botão de salvar
    }
  }, [name, email, password]);

  return (
    <div className="modal"> {/* Container principal do modal */}
      <div className="modal-container"> {/* Container do conteúdo do modal */}
        <div className="modal-content"> {/* Conteúdo do modal */}
          <h2>Cadastre-se</h2> {/* Título do modal */}
          <p>É rápido e fácil.</p> {/* Descrição do modal */}
          Nome: {/* Label para o campo de nome */}
          <input
            defaultValue={name} // Valor inicial do campo de nome
            onChange={(event) => { setName(event.target.value); }} // Função para atualizar o estado do nome
          />
          E-mail: {/* Label para o campo de e-mail */}
          <input
            defaultValue={email} // Valor inicial do campo de e-mail
            onChange={(event) => { setEmail(event.target.value); }} // Função para atualizar o estado do e-mail
          />
          Senha: {/* Label para o campo de senha */}
          <input
            type="password"
            defaultValue={password} // Valor inicial do campo de senha
            onChange={(event) => { setPassword(event.target.value); }} // Função para atualizar o estado da senha
          />
          <div className="modal-buttons"> {/* Container dos botões */}
            <button
              className="btn btn-danger btn-cancel" // Estilo CSS para o botão de cancelar
              onClick={closeModal} // Função para fechar o modal
            >
              Cancelar
            </button>
            <button
              disabled={buttonDisabled} // Define o estado do botão de salvar como habilitado ou desabilitado
              className="btn btn-success btn-save" // Estilo CSS para o botão de salvar
              onClick={callApiToCreateUser} // Função para criar o usuário
            >
              Salvar
            </button>
          </div>
          <ErrorMessage
            requestErrorMessage={requestErrorMessage} // Passa a mensagem de erro para o componente ErrorMessage
          />
        </div>
      </div>
    </div>
  );
}

UserRegisterModal.propTypes = {
  closeModal: PropTypes.func.isRequired, // Propriedade obrigatória que recebe a função para fechar o modal
};
