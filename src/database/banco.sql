SET client_encoding = 'UTF8';

CREATE TABLE IF NOT EXISTS Usuarios (
  id                SERIAL       NOT NULL PRIMARY KEY,
  nome              VARCHAR(255) NOT NULL,
  email             VARCHAR(255) NOT NULL UNIQUE,
  senha_hash        VARCHAR(255) NOT NULL,
  papel             SMALLINT     NOT NULL CHECK (papel IN (0,1)),  -- 0=cliente, 1=gerente
  data_criacao      TIMESTAMP    DEFAULT now(),
  data_atualizacao  TIMESTAMP    DEFAULT now()
);

CREATE TABLE IF NOT EXISTS Produtos (
  id                SERIAL       NOT NULL PRIMARY KEY,
  Usuarios_id       BIGINT       NOT NULL REFERENCES Usuarios(id),
  nome_produto      VARCHAR(255) NOT NULL,
  preco             DECIMAL(10, 2),
  urlImagem         VARCHAR(255),
  data_criacao      TIMESTAMP    DEFAULT now(),
  data_atualizacao  TIMESTAMP    DEFAULT now()
);

INSERT INTO Usuarios (nome, email, senha_hash, papel) VALUES('Usuário', 'user@user.com.br', '123', 0);
INSERT INTO Usuarios (nome, email, senha_hash, papel) VALUES('Admin', 'admin@admin.com.br', '123', 1);

INSERT INTO Produtos (Usuarios_id, nome_produto, preco) VALUES(1, 'Blusa Biamar', 350.00);
INSERT INTO Produtos (Usuarios_id, nome_produto, preco) VALUES(1, 'Conjunto de moletom', 300.00);
