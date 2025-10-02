# [Cida Modas - Site para vendas]

## 1) Problema
- Uma loja não possui site para vendas e mostruário, isso acaba resultando 
   em frustração, tanto da parte do consumidor que não pode agilizar as compras, 
   quanto da parte do vendedor que não lucra com mais vendas.
- Objetivo inicial: cadastrar clientes e fazer o mostruário das roupas para otimizar o tempo dos vendedores.
     

## 2) Atores e Decisores (quem usa / quem decide)
- Usuários principais: Clientes e consumidores da loja.
- Decisores/Apoiadores: Vendedores e gerentes.

## 3) Casos de uso (de forma simples)
- Todos: Logar/deslogar do sistema; manter dados cadastrais.
- Vendedor/Gerente: Manter (inserir, mostrar, editar, remover) todos os catálogos.
- Cliente/Consumidor: Manter (inserir, mostrar, editar, remover) sua sacola de compras do site.

## 4) Limites e suposições
- Limites: entrega final até o fim da disciplina (2025-12-18); rodar no navegador; sem serviços pagos.
- Suposições: internet no laboratório; navegador atualizado; acesso ao GitHub; 10 min para teste rápido.
- Plano B: sem internet → rodar local e salvar em arquivo/LocalStorage; sem tempo do professor → testar com 3 colegas. -->

## 5) Hipóteses + validação
- Valor: Se o cliente possuir um site para inspeção de produtos, ele fica mais confortável em comprar naquela loja.
- Validação: teste com 10 clientes em loja; sucesso se ≥9 abrem/fecham o site ou cadastro sem ajuda.

## 6) Fluxo principal e primeira fatia
     1) Cliente entra e faz seu cadastro no site
     2) Primeira página vai ter o mostruário de roupas
     3) Clica em uma peça que gosta e adiciona na sacola de compras de acordo com seu tamanho
     4) Cliente vai na aba do carrinho e confirma seu pedido
     5) Abre a aba de opções de pagamento
     6) Cliente tem a opção de retirar no local ou mandar entregar sua compra
     7) Vendedor recebe o pedido e aceita pelo site para começar o preparo

## 7) Esboços de algumas telas (wireframes)
- Tela de Login:
![Wireframe - Tela de Login](./images/teladelogin.png)
- Tela Principal:
![Wireframe - Tela Principal](./images/telaprincipal.png)
- Tela do Produto:
![Wireframe - Tela do Produto](./images/telaproduto.png)
- Tela da Sacola/Carrinho:
![Wireframe - Tela da Sacola/Carrinho](./images/telasacola.png)

## 8) Tecnologias

### 8.1 Navegador
- **Navegador:** HTML/CSS/JS/Bootstrap  
- **Armazenamento local** 
- **Hospedagem:** GitHub Pages

### 8.2 Front-end (servidor de aplicação, se existir)
- **Front-end (servidor):** React  
- **Hospedagem:** Github Pages

### 8.3 Back-end (API/servidor, se existir)
- **Back-end (API):** JavaScript com Express 
- **Banco de dados:** MySql ou Postgre
- **Deploy do back-end:** Estudando o que fazer

## 9) Plano de Dados (Dia 0) — somente itens 1–3

### 9.1 Entidades
- Usuário - pessoa que utiliza o site para fins prórpios(cliente/funcionário)
- Sacola - lugar onde fica salvo os produtos que o usuário quer comprar
- Produto - peças que os clientes gostam e podem comprar

### 9.2 Campos por entidade

### Usuarios
| Campo           | Tipo                          | Obrigatório | Exemplo            |
|-----------------|-------------------------------|-------------|--------------------|
| id              | número                        | sim         | 1                  |
| nome            | texto                         | sim         | "Pietra Andrade"   |
| email           | texto                         | sim (único) | "pi@exemplo.com"   |
| senha_hash      | texto                         | sim         | "$2a$10$..."       |
| papel           | número (0=cliente, 1=gerente) | sim         | 0                  |
| dataCriacao     | data/hora                     | sim         | 2025-08-28 08:19   |
| dataAtualizacao | data/hora                     | sim         | 2025-08-28 10:00   |

### Produtos
| Campo           | Tipo               | Obrigatório | Exemplo                 |
|-----------------|--------------------|-------------|-------------------------|
| id              | número             | sim         | 2                       |
| Usuario_id      | número (fk)        | sim         | 8f3a-...                |
| texto           | texto              | sim         | "Erro ao compilar"      |
| estado          | char               | sim         | 'a' \| 'f'              |
| dataCriacao     | data/hora          | sim         | 2025-08-20 08:19        |
| dataAtualizacao | data/hora          | sim         | 2025-08-20 10:00        |

### 9.3 Relações entre entidades
- Um cliente possui muitos produtos. (1→N)
- Um produto pertence a um Usuario. (N→1)

### 9.4 Modelagem do banco de dados no POSTGRES

```sql
CREATE TABLE Usuarios (
  id                SERIAL       NOT NULL PRIMARY KEY,
  nome              VARCHAR(255) NOT NULL,
  email             VARCHAR(255) NOT NULL UNIQUE,
  senha_hash        VARCHAR(255) NOT NULL,
  papel             SMALLINT     NOT NULL CHECK (papel IN (0,1)),  -- 0=cliente, 1=gerente
  data_criacao      TIMESTAMP    DEFAULT now(),
  data_atualizacao  TIMESTAMP    DEFAULT now()
);

CREATE TABLE Produtos (
  id                SERIAL       NOT NULL PRIMARY KEY,
  Usuarios_id       BIGINT       NOT NULL REFERENCES Usuarios(id),
  texto             VARCHAR(255) NOT NULL,
  estado            CHAR(1)      NOT NULL CHECK (estado IN ('t','n')), -- t=tem, n=não tem
  urlImagem         VARCHAR(255),
  data_criacao      TIMESTAMP    DEFAULT now(),
  data_atualizacao  TIMESTAMP    DEFAULT now()
);

INSERT INTO Usuarios (nome, email, senha_hash, papel) VALUES('Usuário', 'user@user.com.br', '123', 0);
INSERT INTO Usuarios (nome, email, senha_hash, papel) VALUES('Admin', 'admin@admin.com.br', '123', 1);

INSERT INTO Produtos (usuario_id, texto, estado) VALUES(1, 'Blusa Biamar', 't');
```
