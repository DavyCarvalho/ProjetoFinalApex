import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RiContactsBookLine } from 'react-icons/ri';

import { login } from '../services/apiService';
import ErrorMessage from '../components/errorMessage';
import UserRegisterModal from '../components/userRegisterModal';

import '../styles/pages/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [registerModalIsVisible, setRegisterModalIsVisible] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState();

  const pageRouter = useHistory();

  async function callApiToAuthenticateUser() {
    const { apiResponse } = await login({ email, password });

    if (apiResponse.errorMessage != null) {
      setRequestErrorMessage(apiResponse.errorMessage);
    } else {
      localStorage.setItem('token', apiResponse.data.toString());

      pageRouter.push('/home');
    }
  };

  useEffect(() => {
    const emailRegex = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (emailRegex.test(email) && password.length >= 3) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <div className="container-login">
      <div className="container-login-header">
        <h4 className="project-name">MyContacts</h4>
        <RiContactsBookLine className="icon-login" />
      </div>
      <div className="email-input">
        E-mail:
        <input
          placeholder="csharp@email.com"
          className="form-control"
          onChange={(event) => { setEmail(event.target.value) }}
        />
      </div>
      <div className="password-input">
        Senha:
        <input
          type="password"
          placeholder="***********"
          className="form-control"
          onChange={(event) => { setPassword(event.target.value) }}
        />
      </div>
      <div className="container-login-buttons">
        <button
          className="btn btn-dark button"
          disabled={buttonDisabled}
          onClick={callApiToAuthenticateUser}
        >
          Entrar
        </button>
        <div className="divider-line"></div>
        <button
          className="btn btn-dark button"
          onClick={() => setRegisterModalIsVisible(true)}
        >
          Criar conta
        </button>
        {
          registerModalIsVisible
            ? <UserRegisterModal closeModal={() => setRegisterModalIsVisible(false)} />
            : null
        }
      </div>
      <ErrorMessage
        requestErrorMessage={requestErrorMessage}
      />
    </div>
  );
}
