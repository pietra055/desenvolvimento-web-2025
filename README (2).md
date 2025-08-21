# [Site para vendas]

## 1) Problema
      Uma loja não possui site para vendas e mostruário, isso acaba resultando 
      em frustração, tanto da parte do consumidor que não pode agilizar as compras, 
      quanto da parte do vendedor que não lucra com mais vendas.
      Objetivo inicial: cadastrar clientes e fazer o mostruário das roupas para otimizar o tempo dos vendedores.
     

## 2) Atores e Decisores (quem usa / quem decide)
     Usuários principais: Clientes e consumidores da loja.
     Decisores/Apoiadores: Vendedores e gerentes.

## 3) Casos de uso (de forma simples)
     Todos: Logar/deslogar do sistema; manter dados cadastrais.
     Vendedor/Gerente: Manter (inserir, mostrar, editar, remover) todos os catálogos.
     Cliente/Consumidor: Manter (inserir, mostrar, editar, remover) seu carrinho de compras do site.

## 4) Limites e suposições
     Limites: entrega final até o fim da disciplina (2025-12-18); rodar no navegador; sem serviços pagos.
     Suposições: internet no laboratório; navegador atualizado; acesso ao GitHub; 10 min para teste rápido.
     Plano B: sem internet → rodar local e salvar em arquivo/LocalStorage; sem tempo do professor → testar com 3 colegas. -->

## 5) Hipóteses + validação
     Valor: Se o cliente possuir um site para inspeção de produtos, ele fica mais confortável em comprar naquela loja.
     Validação: teste com 10 clientes em loja; sucesso se ≥9 abrem/fecham o site ou cadastro sem ajuda.

## 6) Fluxo principal e primeira fatia
     1) Cliente entra e faz seu cadastro no site
     2) Primeira página vai ter o mostruário de roupas
     3) Clica em uma peça que gosta e adiciona no carrinho de compras de acordo com seu tamanho
     4) Cliente vai na aba do carrinho e confirma seu pedido
     5) Abre a aba de opções de pagamento
     6) Cliente tem a opção de retirar no local ou mandar entregar sua compra
     7) Vendedor recebe o pedido e aceita pelo site para começar o preparo

## 7) Esboços de algumas telas (wireframes)
<!-- Vale desenho no papel (foto), Figma, Excalidraw, etc. Não precisa ser bonito, precisa ser claro.
     EXEMPLO de telas:
     • Login
     • Lista de chamados (ordem + tempo desde criação)
     • Novo chamado (formulário simples)
     • Painel do professor (atender/encerrar)
     EXEMPLO de imagem:
     ![Wireframe - Lista de chamados](img/wf-lista-chamados.png) -->
[Links ou imagens dos seus rascunhos de telas aqui]

## 8) Tecnologias
<!-- Liste apenas o que você REALMENTE pretende usar agora. -->

### 8.1 Navegador
**Navegador:** [HTML/CSS/JS | React/Vue/Bootstrap/etc., se houver]  
**Armazenamento local (se usar):** [LocalStorage/IndexedDB/—]  
**Hospedagem:** [GitHub Pages/—]

### 8.2 Front-end (servidor de aplicação, se existir)
**Front-end (servidor):** [ex.: Next.js/React/—]  
**Hospedagem:** [ex.: Vercel/—]

### 8.3 Back-end (API/servidor, se existir)
**Back-end (API):** [ex.: FastAPI/Express/PHP/Laravel/Spring/—]  
**Banco de dados:** [ex.: SQLite/Postgres/MySQL/MongoDB/—]  
**Deploy do back-end:** [ex.: Render/Railway/—]

## 9) Plano de Dados (Dia 0) — somente itens 1–3
<!-- Defina só o essencial para criar o banco depois. -->

### 9.1 Entidades
<!-- EXEMPLO:
     - Usuario — pessoa que usa o sistema (aluno/professor)
     - Chamado — pedido de ajuda criado por um usuário -->
- [Entidade 1] — [o que representa em 1 linha]
- [Entidade 2] — [...]
- [Entidade 3] — [...]

### 9.2 Campos por entidade
<!-- Use tipos simples: uuid, texto, número, data/hora, booleano, char. -->

### Usuario
| Campo           | Tipo                          | Obrigatório | Exemplo            |
|-----------------|-------------------------------|-------------|--------------------|
| id              | número                        | sim         | 1                  |
| nome            | texto                         | sim         | "Ana Souza"        |
| email           | texto                         | sim (único) | "ana@exemplo.com"  |
| senha_hash      | texto                         | sim         | "$2a$10$..."       |
| papel           | número (0=aluno, 1=professor) | sim         | 0                  |
| dataCriacao     | data/hora                     | sim         | 2025-08-20 14:30   |
| dataAtualizacao | data/hora                     | sim         | 2025-08-20 15:10   |

### Chamado
| Campo           | Tipo               | Obrigatório | Exemplo                 |
|-----------------|--------------------|-------------|-------------------------|
| id              | número             | sim         | 2                       |
| Usuario_id      | número (fk)        | sim         | 8f3a-...                |
| texto           | texto              | sim         | "Erro ao compilar"      |
| estado          | char               | sim         | 'a' \| 'f'              |
| dataCriacao     | data/hora          | sim         | 2025-08-20 14:35        |
| dataAtualizacao | data/hora          | sim         | 2025-08-20 14:50        |

### 9.3 Relações entre entidades
<!-- Frases simples bastam. EXEMPLO:
     Um Usuario tem muitos Chamados (1→N).
     Um Chamado pertence a um Usuario (N→1). -->
- Um [A] tem muitos [B]. (1→N)
- Um [B] pertence a um [A]. (N→1)
