import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createContact } from '../services/apiService';
import ErrorMessage from './errorMessage';

import '../styles/components/genericModal.css'

export default function AddContactModal({ closeModal }) {
  const [disable, setDisable] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requestErrorMessage, setRequestErrorMessage] = useState();

  async function callApiToCreateContact() {
    const { apiResponse } = await createContact({ name, phone });

    if (apiResponse.errorMessage != null) {
      setRequestErrorMessage(apiResponse.errorMessage);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (name.length > 0 && phone.toString().length === 11) {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [name, phone]);

  return (
    <div className="modal">
      <div className="container-modal">
        <div className="content-modal">
          <h2>Adicionar Contato</h2>
          Nome:
          <input
            name="name"
            type="text"
            onChange={ (event) => { setName(event.target.value) } }
          />
          Telefone:
          <input
            name="phone"
            type="integer"
            onChange={ (event) => { setPhone(event.target.value) } }
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
              disabled={ disable }
              className="btn btn-success btn-save"
              onClick={ callApiToCreateContact }
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

AddContactModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};