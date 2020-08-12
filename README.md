![AntUrl](./docs/banner.png)

## :computer: Instalação

```bash
# Clone este repositório
$ git clone https://github.com/rbmelolima/AntUrl

# Navegue até ele e instale todas as dependências
$ npm i

# Popule a base de dados
$ npm run knex:migrate

# Inicie o servidor
$ npm start
```

É **importante** que você crie o arquivo `auth.ts` dentro da pasta src com o seguinte conteúdo:

```javascript
const auth = {
  "admin": "your_username",
  "password": "your_password"
};

export default auth;
```

## :octocat: Utilizando a aplicação

### Rotas

| Método  | Rota  | Descrição  |
| :------------ | :------------ | :------------ |
| GET  | `/:shortUrl`  |  Redireciona o usuário para o link relacionado ao url minificado  |
|  GET |  `/status/:shortUrl`  |  Retorna quantas vezes a url minificada foi clicada |
|  GET |   `/`  |  Lista todas as urls presentes no banco de dados para o usuário autenticado  |
|  POST | `/`  | Cria uma url minificada e retorna ao usuário  |

## Próximas features
- [ ] Testes automatizados
- [ ] Deletar url do banco de dados


