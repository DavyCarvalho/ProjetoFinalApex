// editContactModal.js: Componente de modal para editar um contato

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { updateContact } from '../services/apiService'; // Importa função para atualizar um contato na API
import ErrorMessage from './errorMessage'; // Importa componente para exibir mensagens de erro

import '../styles/components/genericModal.css'; // Importa os estilos CSS específicos para o modal

export default function EditContactModal({ closeModal, id, contactName, contactPhone }) {
  // Define os estados para armazenar os valores do formulário e a mensagem de erro da requisição
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [name, setName] = useState(contactName);
  const [phone, setPhone] = useState(contactPhone);
  const [requestErrorMessage, setRequestErrorMessage] = useState();

  // Função assíncrona para chamar a API e atualizar um contato
  async function callApiToUpdateContact() {
    const { apiResponse } = await updateContact({ id, name, phone }); // Chama a função updateContact da API

    if (apiResponse.errorMessage != null) {
      // Verifica se ocorreu algum erro na resposta da API
      setRequestErrorMessage(apiResponse.errorMessage); // Define a mensagem de erro para exibir no componente ErrorMessage
    } else {
      window.location.reload(); // Recarrega a página para atualizar a lista de contatos
    }
  }

  // Efeito colateral para habilitar ou desabilitar o botão de salvar conforme os campos são preenchidos
  useEffect(() => {
    if (name.length > 0 && phone.length === 11) {
      setButtonDisabled(false); // Habilita o botão de salvar
    } else {
      setButtonDisabled(true); // Desabilita o botão de salvar
    }
  }, [name, phone]);

  return (
    <div className="modal"> {/* Container principal do modal */}
      <div className="modal-container"> {/* Container do conteúdo do modal */}
        <div className="modal-content"> {/* Conteúdo do modal */}
          <h2>Editar Contato</h2> {/* Título do modal */}
          Name: {/* Label para o campo de nome */}
          <input
            defaultValue={contactName} // Valor inicial do campo de nome
            onChange={(event) => { setName(event.target.value); }} // Função para atualizar o estado do nome
          />
          Telefone: {/* Label para o campo de telefone */}
          <input
            defaultValue={contactPhone} // Valor inicial do campo de telefone
            onChange={(event) => { setPhone(event.target.value); }} // Função para atualizar o estado do telefone
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
              onClick={callApiToUpdateContact} // Função para atualizar o contato
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

EditContactModal.propTypes = {
  closeModal: PropTypes.func.isRequired, // Propriedade obrigatória que recebe a função para fechar o modal
  id: PropTypes.number.isRequired, // Propriedade obrigatória que recebe o ID do contato a ser editado
  contactName: PropTypes.string.isRequired, // Propriedade obrigatória que recebe o nome do contato a ser editado
  contactPhone: PropTypes.number.isRequired, // Propriedade obrigatória que recebe o telefone do contato a ser editado
};
