CSI606-2025-01 - FarmTech 
Discente: Raysa Paiva Magalhães

## Resumo
O FarmTech é uma plataforma de gestão agrícola moderna, projetada para auxiliar pequenos produtores no controle de rebanhos. O sistema foca no monitoramento nutricional e de saúde dos animais, utilizando uma interface reativa para facilitar o lançamento de dados diretamente no campo.

### 1. Tema
Desenvolvimento de uma AgTech (Sistemas Web aplicados à Agropecuária) para gestão de dados zootécnicos, utilizando tecnologias de ponta para garantir performance e integridade de dados.

### 2. Escopo
Este projeto apresenta as seguintes funcionalidades:

- Gestão de Alimentação: Registro de dietas e controle de lotes.
- Controle de Saúde: Cadastro de vacinas, medicamentos e histórico de tratamentos.
- Persistência em Tempo Real: Sincronização automática com o banco de dados.

### 3. Restrições
Neste trabalho não serão considerados:

- Módulo de geolocalização por GPS dos animais.
- Integração direta com hardware de sensores (IoT) nesta versão.
- Geração de notas fiscais ou controle tributário.

### 4. Tecnologias Utilizadas 

- Linguagem: TypeScript 
- Frontend: Next.js
- Estilização: Tailwind CSS 
- Banco de Dados: Firebase Realtime Database



### 6. Como rodar o projeto


## Pré-requisitos

- Node.js 18 ou superior
- pnpm (recomendado) — instale com `npm install -g pnpm` se necessário

Observação: o projeto usa `pnpm` (há um `pnpm-lock.yaml`). Você pode usar `npm`/`yarn`, mas os comandos abaixo usam `pnpm`.

## Instalação

1. Abra um terminal e entre na pasta do frontend:

```bash
cd Frontend
```

2. Instale as dependências:

```bash
pnpm install
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na pasta `Frontend` com as variáveis necessárias para o Firebase.

Variáveis para o cliente (expostas ao browser):

```
NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=seu_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

Variáveis para o lado servidor (Firebase Admin) — usadas por rotas de API/Server:

```
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_CLIENT_EMAIL=seu_client_email
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n
FIREBASE_DATABASE_URL=seu_database_url
```

Importante: no `FIREBASE_PRIVATE_KEY` mantenha os caracteres `\n` no lugar das quebras de linha (o código do projeto aplica `replace(/\\n/g, "\n")` antes de inicializar o admin).

## Rodando em desenvolvimento

No diretório `Frontend` execute:

```bash
pnpm dev
```

O Next.js inicia por padrão em `http://localhost:3000`.

## Build e produção local

Gerar o build:

```bash
pnpm build
```

Executar o servidor buildado:

```bash
pnpm start
```

## Scripts úteis

- `pnpm dev` — modo desenvolvedor
- `pnpm build` — construir para produção
- `pnpm start` — iniciar build em produção
- `pnpm lint` — rodar linter

## Observações e solução de problemas

- Erros de autenticação/BD do Firebase geralmente vêm de variáveis de ambiente incorretas; verifique `NEXT_PUBLIC_FIREBASE_*` e as variáveis `FIREBASE_*` do admin.
- Para o `FIREBASE_PRIVATE_KEY`, se ocorrer erro do tipo `missing private key` ou `invalid credentials`, confirme que as quebras de linha foram escapadas como `\\n` no `.env.local`.
- Se preferir usar `npm` em vez de `pnpm`, substitua `pnpm` por `npm` nos comandos (`npm install`, `npm run dev`, etc.).

