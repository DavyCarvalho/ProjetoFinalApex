import axios from 'axios'; // Importação da biblioteca Axios para fazer requisições HTTP

const api = axios.create({
  baseURL: "http://localhost:5000" // Configuração da URL base da API
});

api.interceptors.request.use(
  (config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') }; // Adiciona o token de autorização aos cabeçalhos das requisições
    return config;
  }
);

api.interceptors.response.use(
  (response) => {
    const { data, status } = response;

    const formattedResponse = buildApiResponseWithStatusCode({ data, status }); // Formata a resposta da API com o status de retorno

    return formattedResponse;
  },
  (error) => {
    const { data, status } = error.response;

    const formattedError = buildApiResponseWithStatusCode({ data, status }); // Formata o erro da API com o status de retorno

    return formattedError;
  }
);

function buildApiResponseWithStatusCode({ data, status = null }) {
  if (data === null && status !== 200 && status !== 201) {
    let apiResponse = {
      errorMessage: data.errorMessage ?? "Serviço indisponível!", // Define a mensagem de erro da resposta
    };

    return { apiResponse };
  }

  let apiResponse = {
    data: data.response, // Define os dados da resposta
    errorMessage: data.errorMessage, // Define a mensagem de erro da resposta
    statusCode: status || {}, // Define o status da resposta
  };

  return { apiResponse };
}

export async function getUserContacts() {
  return await api.get('/contacts').catch((e) => e.response); // Faz uma requisição GET para obter os contatos do usuário
}

export async function updateContact(body) {
  return await api.put('/contacts', body).catch((e) => e.response); // Faz uma requisição PUT para atualizar um contato
}

export async function deleteContact(contactId) {
  return await api.delete(`/contacts/${contactId}`).catch((e) => e.response); // Faz uma requisição DELETE para excluir um contato
}

export async function createContact(body) {
  return await api.post('/contacts', body).catch((e) => e.response); // Faz uma requisição POST para criar um novo contato
}

export async function login(body) {
  return await api.post('/auth/login', body).catch((e) => e.response); // Faz uma requisição POST para autenticar o usuário
}

export async function createUser(body) {
  return await api.post('/users', body).catch((e) => e.response); // Faz uma requisição POST para criar um novo usuário
}
