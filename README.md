
# 📝 Todolist - Gerenciador de Tarefas Desktop

Aplicativo Desktop de Gerenciamento de Tarefas, desenvolvido com:

- ✅ **Frontend:** React + Vite + Tailwind + Electron
- ✅ **Backend:** Java + Spring Boot + H2 (banco de dados em memória)

---

## 🚀 Funcionalidades

- ✅ Criar tarefas
- ✅ Editar tarefas
- ✅ Alterar status (A FAZER, EM ANDAMENTO, PAUSADO, CONCLUÍDO)
- ✅ Deletar tarefas
- ✅ Pesquisar, filtrar e ordenar
- ✅ Banco de dados H2 rodando embutido (nenhuma configuração externa necessária)

---

## 🧠 Tecnologias Utilizadas

- **Frontend:** React + Vite + Tailwind CSS + Electron
- **Backend:** Java 17 + Spring Boot + H2 Database
- Comunicação via API REST rodando localmente

---

## 🗂️ Organização do Projeto

```
todolist/
├── backend/       → Código backend Java + Spring Boot
├── frontend/      → Código frontend React + Electron
```

---

## 🔥 Pré-requisitos

Para rodar o projeto, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **Java 17** (ou superior)

---

## 🛠️ Instalação e Execução

### ✔️ Passo 1: Clone o projeto

```bash
[git clone https://github.com/Jaypnn/todo-app.git
cd todolist/frontend
```

---

### ✔️ Passo 2: Instale as dependências do frontend

```bash
npm install
```

---

## ✔️ Passo 3: Rode o ambiente DEV
npm run dev
✅ Isso irá:

inicializar o frontend.

### ✔️ Passo 4: Execute o aplicativo

```bash
npm run electron
```

✅ Isso irá:

- Iniciar o **Backend** (Spring Boot rodando com banco H2)
- Abrir o Aplicativo Desktop Electron

---

## ✔️ Observação Importante

O backend já roda embutido via Electron, utilizando o arquivo `.jar` gerado na pasta `backend/target`. Não é necessário executar o backend separadamente.

---

## 💾 Banco de Dados

- O sistema utiliza **H2 Database em memória**.
- Os dados persistem **apenas enquanto o aplicativo estiver rodando**.
- Ao fechar, as informações são perdidas (padrão de H2 em memória).

---

## 📑 API Endpoints
O backend fornece uma API REST acessível localmente para gerenciamento das tasks.

🚀 Endpoints disponíveis
| Método | Rota          | Descrição                             |
| ------ | ------------- | ------------------------------------- |
| GET    | `/tasks`      | Retorna todas as tarefas              |
| GET    | `/tasks/{id}` | Retorna uma tarefa específica pelo ID |
| POST   | `/tasks`      | Cria uma nova tarefa                  |
| PUT    | `/tasks/{id}` | Atualiza uma tarefa existente         |
| DELETE | `/tasks/{id}` | Remove uma tarefa                     |

Exemplo de Payload (POST e PUT)
{
  "title": "Estudar Spring Boot",
  "description": "Finalizar projeto da todolist",
  "status": "A_FAZER"
}

✔️ Status permitidos:
- A_FAZER
- EM_ANDAMENTO
- PAUSADO
- CONCLUIDO

---
## 🏥 Health Check

GET /api/health

Retorna informações sobre o status da aplicação.

Exemplo de resposta:
{
  "status": "OK",
  "profile": "dev"
}

---

## 🖥️ Rodando Backend manualmente (opcional)

Se desejar rodar o backend manualmente:

1. Acesse a pasta `backend`:

```bash
cd backend
```

2. Gere o `.jar`:

```bash
./mvnw clean package
```

3. Execute:

```bash
java -jar target/todolist-0.0.1-SNAPSHOT.jar
```

A API estará disponível em:

```
http://localhost:8080/api
```

---

## 🗑️ Docker

> ⚠️ O projeto **não utiliza mais Docker**. Todos os arquivos de configuração foram removidos para simplificar a utilização.

---

## 🛑 Como encerrar o backend corretamente

Ao fechar o aplicativo, o backend é encerrado automaticamente.

---

## 📜 Licença

Projeto desenvolvido para fins educacionais e de teste.

---

## 👨‍💻 Autor

Desenvolvido por **Jay**.
