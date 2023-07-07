import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000"
});

api.interceptors.request.use(
  (config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') }
    return config;
  });

api.interceptors.response.use(
  (response) => {
    const { data, status } = response;

    const formattedResponse = buildApiResponseWithStatusCode({ data, status });

    return formattedResponse;
  },
  (error) => {
    const { data, status } = error.response;

    const formattedError = buildApiResponseWithStatusCode({ data, status });

    return formattedError;
  });

function buildApiResponseWithStatusCode({ data, status = null }) {
  if (data === null || status === 500 || status === 400) {
    let apiResponse = {
      errorMessage: data.errorMessage ?? "Serviço indisponível!",
    };

    return { apiResponse };
  }

  let apiResponse = {
    data: data.response,
    errorMessage: data.errorMessage,
    statusCode: status || {},
  };

  return { apiResponse };
};

export async function getUserContacts() {
  return await api.get('/contacts').catch((e) => e.response);
};

export async function updateContact(body) {
  return await api.put('/contacts', body).catch((e) => e.response);
};

export async function deleteContact(contactId) {
  return await api.delete(`/contacts/${contactId}`).catch((e) => e.response);
};

export async function createContact(body) {
  return await api.post('/contacts', body).catch((e) => e.response);
};

export async function login(body) {
  return await api.post('/auth/login', body).catch((e) => e.response);
};

export async function createUser(body) {
  return await api.post('/users', body).catch((e) => e.response);
};