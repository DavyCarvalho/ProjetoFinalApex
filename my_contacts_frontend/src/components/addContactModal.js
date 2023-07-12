// addContactModal.js: Componente de modal para adicionar um contato

// Importa as dependências necessárias
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createContact } from '../services/apiService'; // Importa função para criar um contato na API
import ErrorMessage from './errorMessage'; // Importa componente para exibir mensagens de erro

import '../styles/components/genericModal.css'; // Importa os estilos CSS específicos para o modal

export default function AddContactModal({ closeModal }) {
  // Define os estados iniciais utilizando o hook useState
  const [buttonDisabled, setButtonDisabled] = useState(true); // Define se o botão de salvar está desabilitado
  const [name, setName] = useState(''); // Armazena o valor do campo de nome do contato
  const [phone, setPhone] = useState(''); // Armazena o valor do campo de telefone do contato
  const [requestErrorMessage, setRequestErrorMessage] = useState(); // Armazena a mensagem de erro da requisição

  // Função assíncrona para chamar a API e criar um contato
  async function callApiToCreateContact() {
    const { apiResponse } = await createContact({ name, phone }); // Chama a função createContact da API

    if (apiResponse.errorMessage != null) {
      // Verifica se ocorreu algum erro na resposta da API
      setRequestErrorMessage(apiResponse.errorMessage); // Define a mensagem de erro para exibir no componente ErrorMessage
    } else {
      window.location.reload(); // Recarrega a página para exibir o novo contato adicionado
    }
  }

  // Efeito colateral que monitora as mudanças nos estados de nome e telefone
  useEffect(() => {
    if (name.length > 0 && phone.toString().length === 11) {
      // Verifica se o nome e o telefone têm valores válidos
      setButtonDisabled(false); // Habilita o botão de salvar
    } else {
      setButtonDisabled(true); // Desabilita o botão de salvar
    }
  }, [name, phone]);

  return (
    <div className="modal"> {/* Container principal do modal */}
      <div className="modal-container"> {/* Container do conteúdo do modal */}
        <div className="modal-content"> {/* Conteúdo do modal */}
          <h2>Adicionar Contato</h2> {/* Título do modal */}
          Nome: {/* Rótulo do campo de nome */}
          <input onChange={(event) => { setName(event.target.value); }} /> {/* Campo de entrada para o nome */}
          Telefone: {/* Rótulo do campo de telefone */}
          <input onChange={(event) => { setPhone(event.target.value); }} /> {/* Campo de entrada para o telefone */}
          <div className="modal-buttons"> {/* Container dos botões */}
            <button
              className="btn btn-danger btn-cancel" // Estilo CSS para o botão de cancelar
              onClick={closeModal} // Função para fechar o modal
            >
              Cancelar
            </button>
            <button
              disabled={buttonDisabled} // Define se o botão está desabilitado
              className="btn btn-success btn-save" // Estilo CSS para o botão de salvar
              onClick={callApiToCreateContact} // Função para criar o contato
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

AddContactModal.propTypes = {
  closeModal: PropTypes.func.isRequired, // Propriedade obrigatória que recebe a função para fechar o modal
};
