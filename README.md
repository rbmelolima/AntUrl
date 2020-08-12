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
| GET  | `/shortUrl`  |  Redireciona o usuário para o link relacionado ao url minificado  |
|  GET |  `/status/:shortUrl`  |  Retorna quantas vezes a url minificada foi clicada |
|  GET |   `/`  |  Lista todas as urls presentes no banco de dados para o usuário autenticado  |
|  POST | `/`  | Cria uma url minificada e retorna ao usuário  |

## Exemplos
**Criação de url minificada**
Inserir em JSON no corpo da requisição:

```json
{
  "longUrl": "https://github.com/rbmelolima/AntUrl"
}
```

**Retorno do status de uma url minificada**
```json
{
  "shortUrl": "55474d",
  "cliked": 11
}
```

**Retorno de uma lista de urls**
```json
[
  {
    "shortUrl": "55474d",
    "longUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jasminealimentos.com%2Falimentacao%2Ftipos-frutas%2F&psig=AOvVaw27IlaASd41jWJtzoVtmeYO&ust=1597336528978000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPCk7ZuMlusCFQAAAAAdAAAAABAD",
    "cliked": 11,
    "created_at": "2020-8-12"
  }
]
```

## Próximas features
- [ ] Testes automatizados
- [ ] Deletar url do banco de dados

