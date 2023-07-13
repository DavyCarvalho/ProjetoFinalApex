import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { createUser } from '../services/apiService';
import ErrorMessage from './errorMessage';
import '../styles/components/genericModal.css'

export default function UserRegisterModal({ closeModal }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [requestErrorMessage, setRequestErrorMessage] = useState();

    async function callApiToCreateUser() {
        const { apiResponse } = await createUser({ name, email, password });

        if (apiResponse.errorMessage != null) {
            setRequestErrorMessage(apiResponse.errorMessage);
        } else {
            closeModal();
        }
    };

    useEffect(() => {
        const strPassword = password.toString();
        const emailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

        if (emailRegex.test(email) && strPassword.length >= 3 && name.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true)
        }
    }, [name, email, password]);

    return (
        <div className='modal'>
            <div className='modal-container'>
                <div className='modal-content'>
                    <h2>Cadastre-se</h2>
                    <p>É rápido e fácil.</p>
                    Nome:
                    <input
                        defaultValue={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                    Email:
                    <input
                        defaultValue={email}
                        onChange={(event) => { setEmail(event.target.value); }}
                    />
                    Senha:
                    <input
                        type="password"
                        defaultValue={password}
                        onChange={(event) => { setPassword(event.target.value); }}
                    />
                    <div className="modal-buttons">
                        <button
                            className="btn btn-danger btn-cancel"
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                        <button
                            disabled={buttonDisabled}
                            className="btn btn-success btn-save"
                            onClick={callApiToCreateUser}
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

UserRegisterModal.propTypes = {
    closeModal: PropTypes.func.isRequired
};