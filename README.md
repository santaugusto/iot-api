# 📡 IoT API - Projeto Backend com NestJS

Este projeto é uma API REST desenvolvida com [NestJS](https://nestjs.com/) que simula a coleta de dados de sensores IoT (temperatura e umidade), aplicando arquitetura **CQRS**, persistência com **PostgreSQL** e utilização de **Docker** para facilitar o ambiente de desenvolvimento.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker + Docker Compose](https://www.docker.com/)
- [TypeORM]
- [Class-validator](https://github.com/typestack/class-validator)
- [Swagger]

---

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/iot-api.git
cd iot-api

npm install

cp .env.exemple .env

🐳 Rodando com Docker (recomendado)
Este projeto já vem com Dockerfile e docker-compose.yml.

Suba os containers:
bash
Copiar
Editar
docker-compose up --build
A API estará disponível em: http://localhost:3000

O banco PostgreSQL estará na porta 5432

▶️ Rodando sem Docker
Certifique-se de ter o PostgreSQL instalado e configurado.

1. Crie o banco de dados
Configure o .env com as credenciais corretas e crie manualmente o banco.

2. Execute a aplicação
bash
Copiar
Editar
npm run start:dev

📂 Estrutura do Projeto
bash
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
🧪 Testes
Para rodar os testes:

bash
Copiar
Editar
npm run test
📌 Padrão de Commits
Este projeto segue o padrão Conventional Commits, como:

feat: nova funcionalidade

fix: correção de bug

chore: tarefas de configuração, build, etc

docs: documentação

refactor: mudanças internas sem alterar comportamento

test: testes


