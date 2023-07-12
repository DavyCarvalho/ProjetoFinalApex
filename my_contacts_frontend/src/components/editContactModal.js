import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { updateContact } from '../services/apiService';
import ErrorMessage from './errorMessage';

import '../styles/components/genericModal.css'

export default function EditContactModal({ closeModal, id, contactName, contactPhone }) {
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);
  const [name, setName] = useState(contactName);
  const [phone, setPhone] = useState(contactPhone);
  const [requestErrorMessage, setRequestErrorMessage] = useState();

  async function callApiToUpdateContact() {
    const { apiResponse } = await updateContact({ id, name, phone });

    if (apiResponse.errorMessage != null) {
      setRequestErrorMessage(apiResponse.errorMessage);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (name.length > 0 && phone.length === 11) {
      setConfirmButtonDisabled(false);
    }
    else {
      setConfirmButtonDisabled(true);
    }
  }, [name, phone]);

  return (
    <div className="modal">
      <div className="container-modal">
        <div className="content-modal">
          <h2>Editar Contato</h2>
          Name:
          <input
            name="name"
            type="text"
            defaultValue={ contactName }
            onChange={ (event) => { setName(event.target.value); } }
          />
          Telefone:
          <input
            name="phone"
            type="integer"
            defaultValue={ contactPhone }
            onChange={ (event) => { setPhone(event.target.value); } }
          />
          <div className="modal-buttons">
            <button
              type="submit"
              className="btn btn-danger btn-cancel"
              onClick={ closeModal }
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={ confirmButtonDisabled }
              className="btn btn-success btn-save"
              onClick={ callApiToUpdateContact }
            >
              Salvar
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

EditContactModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  contactName: PropTypes.string.isRequired,
  contactPhone: PropTypes.number.isRequired,
};
