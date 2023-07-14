// home.js: Página inicial do aplicativo

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdContact } from 'react-icons/io';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';

import { getUserContacts } from '../services/apiService'; // Importa função para obter os contatos do usuário
import AddContactModal from '../components/addContactModal'; // Importa o componente de modal para adicionar contato
import EditContactModal from '../components/editContactModal'; // Importa o componente de modal para editar contato
import ModalDelete from '../components/deleteContactModal'; // Importa o componente de modal para deletar contato

import '../styles/pages/home.css'; // Importa os estilos CSS específicos para a página inicial

export default function Home() {
  const [contacts, setContacts] = useState(null); // Define o estado para armazenar os contatos do usuário
  const [addContactModalIsVisible, setAddContactModalIsVisible] = useState(false); // Define o estado para controlar a visibilidade do modal de adição
  const [editContactModalIsVisible, setEditContactModalIsVisible] = useState(false); // Define o estado para controlar a visibilidade do modal de edição
  const [deleteContactModalIsVisible, setDeleteContactModalIsVisible] = useState(false); // Define o estado para controlar a visibilidade do modal de exclusão
  const [selectedContactId, setSelectedContactId] = useState(); // Define o estado para armazenar o ID do contato selecionado
  const [selectedContactName, setSelectedContactName] = useState(); // Define o estado para armazenar o nome do contato selecionado
  const [selectedContactPhone, setSelectedContactPhone] = useState(); // Define o estado para armazenar o telefone do contato selecionado

  const pageRouter = useHistory(); // Define o objeto para controlar o redirecionamento de páginas

  function redirectIfUserNotLogged() {
    const token = localStorage.getItem('token'); // Obtém o token do usuário armazenado no localStorage

    if (!token) {
      pageRouter.push('/login'); // Redireciona para a página de login se o token não estiver presente
    }
  }

  redirectIfUserNotLogged(); // Verifica se o usuário está autenticado

  function logout() {
    localStorage.removeItem('token'); // Remove o token do usuário do localStorage
    pageRouter.push('/login'); // Redireciona para a página de login
  };

  function setContactInputValuesToEditModal(id, name, phone) {
    setSelectedContactId(id); // Define o ID do contato selecionado
    setSelectedContactName(name); // Define o nome do contato selecionado
    setSelectedContactPhone(phone); // Define o telefone do contato selecionado
  }

  function showModalDelete(id, name) {
    setDeleteContactModalIsVisible(true); // Define a visibilidade do modal de exclusão como verdadeiro
    setSelectedContactId(id); // Define o ID do contato selecionado
    setSelectedContactName(name); // Define o nome do contato selecionado
  };

  async function fetchData() {
    try {
      const { apiResponse } = await getUserContacts(); // Chama a função getUserContacts da API para obter os contatos do usuário

      if (apiResponse.statusCode === 401 || apiResponse.statusCode === 403) {
        logout(); // Realiza logout se a resposta da API indicar que o usuário não está autenticado
      }

      if (apiResponse.statusCode === 200) {
        setContacts(apiResponse.data); // Atualiza o estado com os contatos do usuário
      }
    } catch (e) {
      console.error(e);
    }
  }

  fetchData(); // Chama a função fetchData() ao renderizar o componente

  return (
    <div className="container-contacts-list"> {/* Container principal da página */}
      <div className="container-header-contacts"> {/* Container do cabeçalho */}
        <h2>MyContacts</h2> {/* Título da página */}
        <button
          className="btn btn-secondary add-contact" // Estilo CSS para o botão de adicionar contato
          onClick={() => setAddContactModalIsVisible(true)} // Função para exibir o modal de adição de contato
        >
          Adicionar Contato
        </button>
        {
          addContactModalIsVisible // Verifica se o modal de adição de contato está visível
            ? <AddContactModal closeModal={() => setAddContactModalIsVisible(false)} /> // Componente de modal de adição de contato
            : null
        }
        <button
          className="btn btn-dark" // Estilo CSS para o botão de logout
          onClick={logout} // Função para realizar logout
        >
          Sair
        </button>
      </div>
      <table className="table container-table"> {/* Tabela de contatos */}
        <thead>
          <tr>
            <td className="icon-collumn"></td>
            <td className="name-collumn">Nome</td>
            <td className="phone-collumn">Telefone</td>
            <td className="action-collumn">Ações</td>
          </tr>
        </thead>
        {
          contacts == null // Verifica se há contatos para exibir na tabela
            ? null
            : <tbody>
              {contacts.map(({ id, name, phone }) => ( // Mapeia os contatos e renderiza cada um na tabela
                <tr key={id}>
                  <td className="icon-values"><IoMdContact /></td> {/* Ícone de contato */}
                  <td className="name-values">{name}</td> {/* Nome do contato */}
                  <td className="phone-values">{phone}</td> {/* Telefone do contato */}
                  <td className="action-values"> {/* Coluna de ações */}
                    <a
                      className="icon-values button-whatsapp" // Estilo CSS para o ícone de WhatsApp
                      href={`https://api.whatsapp.com/send?phone=${phone}&text=Olá ${name} tudo bem?`} // Link do WhatsApp com a mensagem pré-preenchida
                    >
                      <AiOutlineWhatsApp /> {/* Ícone do WhatsApp */}
                    </a>
                    <button
                      className="btn btn-link button-edit" // Estilo CSS para o botão de edição
                      onClick={() => {
                        setContactInputValuesToEditModal(id, name, phone); // Define os valores de entrada para o modal de edição
                        setEditContactModalIsVisible(true); // Exibe o modal de edição de contato
                      }}
                    >
                      <BiEditAlt /> {/* Ícone de edição */}
                    </button>
                    {
                      editContactModalIsVisible // Verifica se o modal de edição de contato está visível
                        ? <EditContactModal // Componente de modal de edição de contato
                          closeModal={() => setEditContactModalIsVisible(false)}
                          id={selectedContactId}
                          contactName={selectedContactName}
                          contactPhone={selectedContactPhone}
                        />
                        : null
                    }
                    <button
                      className="btn btn-link button-delete" // Estilo CSS para o botão de exclusão
                      onClick={() => showModalDelete(id, name)} // Função para exibir o modal de exclusão de contato
                    >
                      <RiDeleteBin5Line /> {/* Ícone de exclusão */}
                    </button>
                    {
                      deleteContactModalIsVisible // Verifica se o modal de exclusão de contato está visível
                        ? <ModalDelete // Componente de modal de exclusão de contato
                          closeModal={() => setDeleteContactModalIsVisible(false)}
                          id={selectedContactId}
                          contactName={selectedContactName}
                        />
                        : null
                    }
                  </td>
                </tr>
              ))}
            </tbody>
        }
      </table>
    </div>
  );
}