import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createContact } from '../services/apiService';
import ErrorMessage from './errorMessage';

import '../styles/components/genericModal.css'

export default function AddContactModal({ closeModal }) {
    const [buttonDisabled, setButtonDisabled] = useState(true);
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
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [name, phone]);

    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='modal-content'>
                    <h2>Adicionar Contato</h2>
                    Nome:
                    <input onChange={(event) => { setName(event.target.value) }} />
                    Telefone:
                    <input onChange={(event) => { setPhone(event.target.value) }} />
                    <div className='modal-buttons'>
                        <button
                            className='btn btn-danger btn-cancel'
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                        <button
                            className='btn btn-success btn-save'
                            disabled={buttonDisabled}
                            onClick={callApiToCreateContact}
                        >
                            Salvar
                        </button>
                    </div>
                    <ErrorMessage requestErrorMessage={requestErrorMessage} />
                </div>
            </div>
        </div>
    );
}

AddContactModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};