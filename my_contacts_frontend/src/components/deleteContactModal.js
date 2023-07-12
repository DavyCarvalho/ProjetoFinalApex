// deleteContactModal.js: Componente de modal para deletar um contato

// Importa as dependências necessárias
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { deleteContact } from '../services/apiService'; // Importa função para deletar um contato na API
import ErrorMessage from './errorMessage'; // Importa componente para exibir mensagens de erro

import '../styles/components/genericModal.css'; // Importa os estilos CSS específicos para o modal

export default function ModalDelete({ closeModal, id, contactName }) {
  // Define o estado para armazenar a mensagem de erro da requisição
  const [requestErrorMessage, setRequestErrorMessage] = useState();

  // Função assíncrona para chamar a API e deletar um contato
  async function callApiToDeleteContact() {
    const { apiResponse } = await deleteContact(id); // Chama a função deleteContact da API

    if (apiResponse.errorMessage != null) {
      // Verifica se ocorreu algum erro na resposta da API
      setRequestErrorMessage(apiResponse.errorMessage); // Define a mensagem de erro para exibir no componente ErrorMessage
    } else {
      closeModal(); // Fecha o modal
      window.location.reload(); // Recarrega a página para atualizar a lista de contatos
    }
  }

  return (
    <div className="modal"> {/* Container principal do modal */}
      <div className="modal-container"> {/* Container do conteúdo do modal */}
        <div className="modal-content"> {/* Conteúdo do modal */}
          <h2>Deletar contato</h2> {/* Título do modal */}
          <p>
            Tem certeza que deseja excluir
            {' "'}
            {contactName}
            {'" '}
            da sua lista de contatos?
          </p> {/* Mensagem de confirmação de exclusão */}
          <div className="modal-buttons"> {/* Container dos botões */}
            <button
              className="btn btn-danger btn-cancel" // Estilo CSS para o botão de cancelar
              onClick={closeModal} // Função para fechar o modal
            >
              Cancelar
            </button>
            <button
              className="btn btn-success btn-save" // Estilo CSS para o botão de excluir
              onClick={callApiToDeleteContact} // Função para excluir o contato
            >
              Excluir
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

ModalDelete.propTypes = {
  closeModal: PropTypes.func.isRequired, // Propriedade obrigatória que recebe a função para fechar o modal
  id: PropTypes.number.isRequired, // Propriedade obrigatória que recebe o ID do contato a ser excluído
  contactName: PropTypes.string.isRequired, // Propriedade obrigatória que recebe o nome do contato a ser excluído
};
