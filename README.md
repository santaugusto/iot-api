# 📡 IoT API - Projeto Backend com NestJS

Este projeto é uma API REST desenvolvida com [NestJS](https://nestjs.com/) que simula a coleta de dados de sensores IoT (temperatura e umidade), aplicando arquitetura **CQRS**, persistência com **PostgreSQL**, integração com **Elasticsearch** para busca e análise, além do uso de **Docker** para facilitar o ambiente de desenvolvimento.

Além disso, oferece suporte para visualização dos dados via **Kibana** e orientações para criação de dashboards personalizados.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Elasticsearch](https://www.elastic.co/elasticsearch/)
- [Kibana](https://www.elastic.co/kibana/)
- [Docker + Docker Compose](https://www.docker.com/)
- [TypeORM](https://typeorm.io/)
- [Class-validator](https://github.com/typestack/class-validator)
- [Swagger](https://swagger.io/)

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/iot-api.git
cd iot-api
npm install
cp .env.exemple .env
2. Rodar com Docker (recomendado)
Este projeto vem com Dockerfile e docker-compose.yml, incluindo serviços para:

API NestJS

PostgreSQL

Elasticsearch

Kibana

Para subir os containers:

bash
Copiar
Editar
docker-compose up --build
A API estará disponível em: http://localhost:3000
Kibana estará disponível em: http://localhost:5601
PostgreSQL na porta 5432
Elasticsearch na porta 9200

3. Rodar sem Docker
Certifique-se de ter PostgreSQL e Elasticsearch instalados e configurados.

Crie o banco PostgreSQL manualmente e configure as variáveis no .env.

Inicie o NestJS:

bash
Copiar
Editar
npm run start:dev
🗂 Estrutura do Projeto
css
Copiar
Editar
src/
├── app.module.ts
├── main.ts
├── sensor/
│   ├── controllers/
│   ├── dto/
│   ├── commands/
│   ├── queries/
│   └── entities/
├── reading/
│   ├── controllers/
│   ├── dto/
│   ├── commands/
│   ├── queries/
│   └── entities/
📊 Elasticsearch & Kibana
Os dados de leitura são indexados no Elasticsearch no índice sensor-data.

Kibana está configurado para se conectar ao Elasticsearch e pode ser usado para explorar e visualizar os dados.

No Kibana, crie o Index Pattern sensor-data* e escolha o campo timestamp como base temporal.

Você pode criar visualizações do tipo Lens para gráficos de linha, barras, tabelas e criar dashboards interativos com filtros por sensor, tempo e valor.

Exemplo de visualização Lens no Kibana
Gráfico de linha com eixo X = timestamp

Eixo Y = value

Filtro por sensorId para selecionar sensores específicos (ex: sensor da Estufa)

Dashboard com múltiplas visualizações para monitoramento em tempo real

🛠 Endpoints principais da API
GET /readings/search — busca leituras com filtros opcionais:

sensorId

startDate (ISO 8601)

endDate (ISO 8601)

minValue

maxValue

Exemplo de chamada:

h
Copiar
Editar
GET /readings/search?sensorId=872e2a3c-6c80-4275-a367-b6baafccbb48&startDate=2025-08-01T00:00:00Z&endDate=2025-08-02T00:00:00Z
🧪 Testes
Para rodar os testes automatizados:

bash
Copiar
Editar
npm run test
📌 Padrão de Commits
Este projeto segue o padrão Conventional Commits:

feat: nova funcionalidade

fix: correção de bugs

chore: tarefas de build, config, docs etc.

docs: documentação

refactor: mudanças internas sem alterar comportamento

test: inclusão/modificação de testes

📖 Documentação
A documentação Swagger está disponível em:

bash
Copiar
Editar
http://localhost:3000/api