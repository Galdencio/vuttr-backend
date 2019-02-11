// Asserção nativa do Node.JS
const assert = require('assert');

// Biblioteca de requisição
const axios = require('axios');

// Objetos que serão cadastrados no banco de dados
const mock_tools = [
  { title: "Notion", link: "https://notion.so", description: "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ", tags: ["organization", "planning", "collaboration", "writing", "calendar"] },
  { title: "json-server", link: "https://github.com/typicode/json-server", description: "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.", tags: ["api", "json", "schema", "node", "github", "rest"] },
  { title: "fastify", link: "https://www.fastify.io/", description: "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.", tags: ["web", "framework", "node", "http2", "https", "localhost"] }
]
const mock_user = { email: `bossabox${Date.now()}@bossabox.com.br`, password: "bossabox123" };

let api;
let mock_tool_create = {
  "title": "hotel",
  "link": "https://github.com/typicode/hotel",
  "description": "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  "tags": ["node", "organizing", "webapps", "domain", "developer", "https", "proxy"]
}
let mock_tool_created_id;

describe('VUTTR Test', function () {

  this.beforeAll(async () => {
    api = axios.create({
      baseURL: 'http://localhost:3000'
    });

    // Remove todas as tools para deixar o banco de dados limpo para os testes
    const { data } = await api.get('/tools');
    for (let toolDb of data) {
      await api.delete(`/tools/${toolDb.id}`);
    }
    // Cadastra tools do mock
    for (let mock_tool of mock_tools) {
      await api.post('/tools', mock_tool);
    }
  });

  it('0: A API deve responder na porta 3000', async () => {
    const { data } = await api.get('/');
    const expected = 'Server running on port 3000';
    assert.equal(data, expected);
  });

  it('1: Deve haver uma rota para listar todas as ferramentas cadastradas', async () => {
    const { data } = await api.get('/tools');
    let tools = [];
    data.map(tool => tools.push({ title: tool.title, link: tool.link, description: tool.description, tags: tool.tags }));
    assert.deepEqual(tools, mock_tools);
  });

  it('2: Deve ser possível filtrar ferramentas utilizando uma busca por tag', async () => {
    const { data } = await api.get('/tools?tag=node');
    let tools = [];
    data.map(tool => tools.push({ title: tool.title, link: tool.link, description: tool.description, tags: tool.tags }));

    // Remove primeiro item do mock que não contém a tag node
    mock_tools.shift();

    assert.deepEqual(tools, mock_tools);
  });

  it('3: Deve haver uma rota para cadastrar uma nova ferramenta', async () => {
    const { data } = await api.post('/tools', mock_tool_create);
    mock_tool_created_id = data.id;
    let tool = { title: data.title, link: data.link, description: data.description, tags: data.tags };
    assert.deepEqual(tool, mock_tool_create);
  });

  it('4: O usuário deve poder remover uma ferramenta por ID', async () => {
    const deletedTool = await api.delete(`/tools/${mock_tool_created_id}`);
    assert.deepEqual(deletedTool.status, 200);
  });

});

describe('VUTTR Test - Bônus', function () {

  this.beforeAll(async () => {
    api = axios.create({
      baseURL: 'http://localhost:3000'
    });
  });

  it('5: Criação de usuário', async () => {
    const { data } = await api.post('/auth/register', mock_user);
    let dataUser = data.user;
    assert.deepEqual(dataUser.email, mock_user.email);
  });

  it('6: Autenticação de usuário', async () => {
    const { data } = await api.post('/auth/authenticate', mock_user);
    assert.ok(typeof data.token === 'string');
  });

});
