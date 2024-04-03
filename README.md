# Desafio OZmap

# Objetivo:
Desenvolver utilizando uma API Restful para consulta e controle de geolocalização.

# Sobre o Projeto
- O projeto é um teste para a OZmap, utilizei conceitos de DDD, tentei aplicar SOLID ao máximo e também implementei testes unitários na maior parte do sistema.
- Utilizei Docker para conteinerização.
- Este projeto será atualizado com recorrência.
  
## Tecnologias utilizadas:
- Express, 
- Node.js, 
- Mongoose,
- MongoDB,
- Jest

## Como Utilizar:

1. Clone o repositório para sua máquina utilizando o comando:

   `git clone [git@github.com:leonardocbrand/ozmap-challenge.git](https://github.com/luizphelip3/luiz-phelipe-silva-ozmap-test.git)`

2. Entre na pasta do repositório e instale as dependências utilizando o comando:

   `npm install`

3. Crie um arquivo **.env** contendo as mesmas variáveis de ambiente presentes no arquivo **.env.example**, ou use os dados do exemplo abaixo:
<pre>
<code>DB_PORT=9009
API_PORT=3001
MONGODB_URI=mongodb+srv://mongo-db:27032@ozmap-challenge.jgwaeyh.mongodb.net/
DB_NAME=ozmap-challenge
DB_USER=mongo-db
DB_PASS=27032
GOOGLE_GEOCODING_API_KEY=AIzaSyBlv0cLDTLZooBH5XiY23J-zoojl3-C7Yg
GOOGLE_GEOCODING_REVERSE_URL='https://maps.googleapis.com/maps/api/geocode/json?latlng='
GOOGLE_GEOCODING_URL='https://maps.googleapis.com/maps/api/geocode/json?address='
</code></pre>

4. Abra um terminal na raíz do projeto e rode o comando <code>docker-compose up</code>;

5. Os contêineres irão subir e a aplicação estará pronta para uso;

## 💻 Aplicação:

# Usuários
- Nesta API, é possível criar um usuário utilizando de forma obrigatória nome e email, e opcionalmente coordenadas ou endereço.
- Caso o usuário não envie as coordenadas, utilizando a Geocoding API da Google, iremos resgatar o dado de endereço.
- Caso o usuário não envie o endereço completo, utilizando a Geocoding API da Google, iremos resgatar os dados de coordenadas.
- O usuário deve enviar pelo menos um desses dados, e nunca pode enviar ambos ao mesmo tempo.
- Será possível: atualizar, deletar, buscar todos de forma paginada e busca apenas um usuário.

# Regiões
- Nesta api é possível criar regiões utilizando de forma obrigatória nome, coordenadas e id do usuário dono da região.
- Será possível: atualizar, deletar, buscar todas as regiões de forma paginada, buscar todas as regiões num ponto específico, buscar todas as regiões até uma determinada distância de um ponto específico, sendo o dono ou não da região.

## Testes
- Para rodar os testes, basta colar o comando no terminal na raíz do projeto: **npm run test**.

## Insomnia
- Para realizar consultas à api, é possível fazê-lo de qualquer lugar, mas disponibilizei um arquivo insomnia.json com a collection da api, que armazena todas as rotas.
