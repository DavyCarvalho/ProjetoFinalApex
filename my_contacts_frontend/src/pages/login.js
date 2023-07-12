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
  const [confirmButtonDisable, setConfirmButtonDisable] = useState(true);
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
    const testEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (testEmail.test(email) && password.length >= 3) {
      setConfirmButtonDisable(false);
    }
    else {
      setConfirmButtonDisable(true);
    }
  }, [email, password]);

  return (
    <div className="container-login">
        <div className="container-login-header mb-3">
          <h4 className="project-name">MyContacts</h4>
          <RiContactsBookLine className="icon-login" />
        </div>
      <div className="mb-3">
        <label
          htmlFor="inputEmail"
          className="form-label"
        >
          E-mail
          <input
            type="email"
            name="email"
            placeholder="csharp@email.com"
            className="form-control"
            id="inputEmail"
            onChange={ (event) => { setEmail(event.target.value); } }
          />
        </label>
      </div>
      <div className="mb-3">
        <label
          htmlFor="inputPassword"
          className="form-label"
        >
          Senha
          <input
            type="password"
            name="password"
            placeholder="******"
            className="form-control"
            id="inputPassword"
            onChange={(event) => { setPassword(event.target.value); }}
          />
        </label>
      </div>
      <div className="container-login-button mb-3">
        <button
          type="submit"
          className="btn btn-dark button"
          confirmButtonDisabled={confirmButtonDisable}
          onClick={ callApiToAuthenticateUser }
        >
          Entrar
        </button>
        <div className="divider-line"> </div>
        <button
          type="submit"
          className="btn btn-dark button"
          onClick={ () => setRegisterModalIsVisible(true) }
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
