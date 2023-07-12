Vou explicar como funcionam os React Hooks usados no projeto, citando trechos de código relevantes e usando ilustrações para tornar o entendimento mais fácil.

**1. useState:**
O Hook useState é utilizado para adicionar estado aos componentes funcionais. Ele permite que você defina e manipule estados locais sem a necessidade de criar uma classe. Por exemplo, no componente `AddContactModal`, utilizamos o useState para gerenciar os estados do nome, telefone e mensagem de erro.

```jsx
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [requestErrorMessage, setRequestErrorMessage] = useState();
```

Nesse trecho, criamos três estados utilizando o useState. O primeiro estado é o `name`, que é inicializado como uma string vazia. O segundo estado é o `phone`, que também é inicializado como uma string vazia. O terceiro estado é o `requestErrorMessage`, que é inicializado como `undefined`.

Para atualizar esses estados, utilizamos as funções `setName`, `setPhone` e `setRequestErrorMessage`. Por exemplo, ao digitar no campo de nome, chamamos a função `setName` para atualizar o estado `name` com o valor digitado.

**2. useEffect:**
O Hook useEffect é utilizado para executar efeitos colaterais em componentes funcionais. Ele é executado após a renderização do componente e permite que você realize ações como buscar dados de uma API, manipular o DOM ou atualizar outros estados. 

No componente `Home`, utilizamos o useEffect para buscar os contatos do usuário ao carregar a página:

```jsx
useEffect(() => {
  fetchData();
});
```

Nesse trecho, definimos o useEffect para executar a função `fetchData` quando o componente for montado. Essa função é responsável por fazer a chamada à API e buscar os contatos do usuário.

**3. useHistory:**
O Hook useHistory é utilizado para acessar o histórico de navegação do React Router. Ele fornece uma maneira de navegar programaticamente entre as rotas da aplicação. 

No componente `Home`, utilizamos o useHistory para redirecionar o usuário após efetuar o logout:

```jsx
const pageRouter = useHistory();

function logout() {
  localStorage.removeItem('token');
  pageRouter.push('/login');
}
```

Nesse trecho, criamos uma variável `pageRouter` utilizando o useHistory. Em seguida, definimos a função `logout`, que remove o token de autenticação do localStorage e redireciona o usuário para a rota "/login" utilizando a função `push` do pageRouter.

Esses são alguns exemplos de como os React Hooks são utilizados no projeto. Eles permitem a adição de estados, a execução de efeitos colaterais e o acesso ao histórico de navegação de forma simples e declarativa. Com eles, é possível escrever componentes funcionais mais concisos e fáceis de manter.

Espero que essa explicação, com trechos de código e ilustrações, tenha ajudado a compreender como funcionam os React Hooks no projeto!