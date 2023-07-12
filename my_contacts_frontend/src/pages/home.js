import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdContact } from 'react-icons/io';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { getUserContacts } from '../services/apiService';
import AddContactModal from '../components/addContactModal';
import EditContactModal from '../components/editContactModal';
import ModalDelete from '../components/deleteContactModal';

import '../styles/pages/home.css';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editContactModalIsVisible, setEditContactModalIsVisible] = useState(false);
  const [deleteContactModalIsVisible, setDeleteContactModalIsVisible] = useState(false);
  const [addContactModalIsVisible, setAddContactModalIsVisible] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState();
  const [selectedContactName, setSelectedContactName] = useState();
  const [selectedContactPhone, setSelectedContactPhone] = useState();

  const pageRouter = useHistory();

  function redirectIfUserNotLogged() {
    const token = localStorage.getItem('token');

    if (!token) {
      pageRouter.push('/login');
    }
  }

  redirectIfUserNotLogged();

  function logout() {
    localStorage.removeItem('token');
    pageRouter.push('/login');
  };

  function setContactInputValuesToEditModal(id, name, phone) {
    setSelectedContactId(id);
    setSelectedContactName(name);
    setSelectedContactPhone(phone);
  }

  function showModalDelete(id, name) {
    setDeleteContactModalIsVisible(true);
    setSelectedContactId(id);
    setSelectedContactName(name);
  };

  async function fetchData() {
    try {
      const { apiResponse } = await getUserContacts();

      if (apiResponse.statusCode === 401 || apiResponse.statusCode === 403) {
        logout()
      }

      if (apiResponse.statusCode === 200) {
        setContacts(apiResponse.data);
        setLoading(false);
      }
      else {
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="container-contacts-list">
      <div className="container-header-contacts">
        <h2>MyContacts</h2>
        <button
          className="btn btn-secondary add-contact"
          type="button"
          onClick={() => setAddContactModalIsVisible(true)}
        >
          Adicionar Contato
        </button>
        {addContactModalIsVisible
          ? < AddContactModal closeModal={() => setAddContactModalIsVisible(false)} />
          : null}
        <button
          type="submit"
          onClick={logout}
          className="btn btn-dark"
        >
          Sair
        </button>
      </div>
      <table className="table container-table">
        <thead>
          <tr>
            <td className="col icon-collumn"> </td>
            <td className="col name-values">Nome</td>
            <td className="col">Telefone</td>
            <td className="col action-collumn">Ações</td>
          </tr>
        </thead>
        {loading ? <span>Carregando contatos...</span>
          : contacts.map(
            ({ id, name, phone }) => (
              <tbody key={id} className="container text-center">
                <tr>
                  <td className="icon-values"><IoMdContact /></td>
                  <td className="name-values">{name}</td>
                  <td>{phone}</td>
                  <td className="action-values">
                    <a
                      className="icon-values button-whatsapp"
                      href={`https://api.whatsapp.com/send?phone=${phone}&text=Olá,%20`}
                    >
                      <AiOutlineWhatsApp />
                    </a>
                    <button
                      className="btn btn-link button-edit"
                      type="button"
                      onClick={() => {
                        setContactInputValuesToEditModal(id, name, phone);
                        setEditContactModalIsVisible(true);
                      }}
                    >
                      <BiEditAlt />
                    </button>
                    {editContactModalIsVisible
                      ? <EditContactModal
                        closeModal={() => setEditContactModalIsVisible(false)}
                        id={selectedContactId}
                        contactName={selectedContactName}
                        contactPhone={selectedContactPhone}
                      />
                      : null}
                    <button
                      type="button"
                      className="btn btn-link button-delete"
                      onClick={() => showModalDelete(id, name)}
                    >
                      <RiDeleteBin5Line />
                    </button>
                    {deleteContactModalIsVisible
                      ? <ModalDelete
                        closeModal={() => setDeleteContactModalIsVisible(false)}
                        id={selectedContactId}
                        contactName={selectedContactName}
                      />
                      : null}
                  </td>
                </tr>
              </tbody>
            ),
          )}
      </table>
    </div>
  );
}
