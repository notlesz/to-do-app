# 💻 ToDo App
Uma aplicação de gerenciamento de tarefas, onde o usuário pode cadastrar suas tarefas, excluir, alterar suas informações e seu status caso tenha finalizado ou esteja em atraso e podendo também definir um tempo de execução para essa tarefa.
## ✨ Tecnologias
  * Back-end:
    -  [ ] NodeJS
    -  [ ] Typescript
    -  [ ] PostgreSQL
    -  [ ] Prisma
    -  [ ] Bcrypt
  * Front-end:
    -  [ ] React
    -  [ ] Typescript
    -  [ ] Vite
    -  [ ] Axios
    
<hr />

## 1 - Backend
- Rotas de cadastro, exclusão e alteração do usuário.
- Rota de criação de tarefas do usuário, passando o nome da tarefa, o tempo de execução, status da tarefa e seu id.
- Rota de atualização da tarefa do usuário através do id da tarefa.
- Rota de login onde o usuário irá realizar a autenticação dos seus dados no banco.
    
    ## 1.1 - Banco de dados
    - Tabela de usuário
        - Nome
        - Foto
        - Email
        - Senha
        - ID usuário
        - Data de criação do usuário
        - Data de atualização do usuário
        - Tarefas
    - Tabela de tarefa
        - Nome da tarefa
        - Descrição da tarefa
        - ID da tarefa
        - Data de criação da tarefa
        - Data de atualização da tarefa
        - Tempo de execução da tarefa
        - Status da tarefa (A fazer, Feito, Em atraso)
        
    - Diagrama do banco de dados:
    <img src="/server/prisma/ERD.svg" style=width:500px>
    
    ## 1.2 - Autenticação
    
    - A autenticação é feita através do JWT, que gera um token de acesso para o usuário com duração de 24h.
