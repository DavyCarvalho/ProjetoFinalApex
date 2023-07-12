import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { deleteContact } from '../services/apiService';
import ErrorMessage from './errorMessage';

import '../styles/components/genericModal.css'

export default function ModalDelete({ closeModal, id, contactName }) {
  const [requestErrorMessage, setRequestErrorMessage] = useState();

  async function callApiToDeleteContact() {
    const { apiResponse } = await deleteContact(id);

    if (apiResponse.errorMessage != null) {
      setRequestErrorMessage(apiResponse.errorMessage);
    } else {
      closeModal();
      window.location.reload();
    }
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-content">
          <h2>Deletar contato</h2>
          <p>
            Tem certeza que deseja excluir
            {' "'}
            { contactName }
            {'" '}
            da sua lista de contatos?
          </p>
          <div className="modal-buttons">
            <button
              className="btn btn-danger btn-cancel"
              onClick={ closeModal }
            >
              Cancelar
            </button>
            <button
              className="btn btn-success btn-save"
              onClick={ callApiToDeleteContact }
            >
              Excluir
            </button>
          </div>
          <ErrorMessage
            requestErrorMessage={ requestErrorMessage }
          />
        </div>
      </div>
    </div>
  );
}

ModalDelete.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  contactName: PropTypes.string.isRequired,
};