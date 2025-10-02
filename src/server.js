import express from "express";
import { pool } from "./db.js"; // "pool" gerencia conexões com o PostgreSQL
const app = express();

app.use(express.json()); 

app.get("/", async (_req, res) => {
    try {
        const rotas = {
            "LISTAR": "GET /produtos",
            "MOSTRAR": "GET /produtos/:id",
            "CRIAR": "POST /produtos BODY: { nome: 'string', preco: Number }",
            "SUBSTITUIR": "PUT /produtos/:id BODY: { nome: 'string', preco: Number }",
            "ATUALIZAR": "PATCH /produtos/:id BODY: { nome: 'string' || preco: Number }",
            "DELETAR": "DELETE /produtos/:id",
        };
        res.json(rotas); // Envia um objeto JS como JSON (status 200 por padrão)
    } catch {
        // Em produção normalmente também registramos (logamos) o erro para análise.
        res.status(500).json({ erro: "erro interno" });
    }
});
//LISTAR (GET /produtos)
app.get("/produtos", async (_req, res) => {
    try {
        // Desestruturação: extraímos apenas "rows" do objeto retornado.
        const { rows } = await pool.query("SELECT * FROM produtos ORDER BY id DESC");
        res.json(rows); // retorna um array de objetos (cada objeto é um produto)
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});
//MOSTRAR (GET /produtos/:id)
app.get("/produtos/:id", async (req, res) => {
    // req.params.id é SEMPRE string; usamos Number(...) para converter.
    const id = Number(req.params.id);
    
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }

    try {
        // Consulta parametrizada: $1 será substituído pelo valor de "id".
        const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
        
        // "rows" é um array de linhas. Se não houver primeira linha, não achou.
        const { rows } = result;
        if (!rows[0]) return res.status(404).json({ erro: "não encontrado" });

        // Achou: devolve o primeiro (e único) produto.
        res.json(rows[0]);
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});
//CRIAR (POST /produtos)
app.post("/produtos", async (req, res) => {
    // Extraímos "nome" e "preco" do corpo. Se req.body for undefined, vira {}.
    const { nome, preco } = req.body ?? {};

    // Convertendo "preco" em número. Se falhar, vira NaN.
    const p = Number(preco);

    if (!nome || preco == null || Number.isNaN(p) || p < 0) {
        return res.status(400).json({ erro: "nome e preco (>= 0) obrigatórios" });
    }

    try {
        // INSERT com retorno: RETURNING * devolve a linha criada.
        const { rows } = await pool.query(
            "INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *",
            [nome, p]
        );

        // rows[0] contém o objeto recém-inserido (com id gerado, etc.)
        res.status(201).json(rows[0]); // 201 Created → recurso criado com sucesso
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});
//SUBSTITUIR (PUT /produtos/:id)
app.put("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nome, preco } = req.body ?? {};
    const p = Number(preco);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }
    if (!nome || preco == null || Number.isNaN(p) || p < 0) {
        return res.status(400).json({ erro: "nome e preco (>= 0) obrigatórios" });
    }

    try {
        // Atualiza ambos os campos sempre (sem manter valores antigos).
        const { rows } = await pool.query(
            "UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *",
            [nome, p, id]
        );

        // Se não atualizou nenhuma linha, o id não existia.
        if (!rows[0]) return res.status(404).json({ erro: "não encontrado" });

        res.json(rows[0]); // retorna o produto atualizado
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});
//ATUALIZAR (PATCH /produtos/:id)
app.patch("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nome, preco } = req.body ?? {};

    // Validação do id
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }

    // Se nenhum campo foi enviado, não há o que atualizar.
    if (nome === undefined && preco === undefined) {
        return res.status(400).json({ erro: "envie nome e/ou preco" });
    }

    let p = null;
    if (preco !== undefined) {
        p = Number(preco);
        if (Number.isNaN(p) || p < 0) {
            return res.status(400).json({ erro: "preco deve ser número >= 0" });
        }
    }

    try {
        // Para "nome": se não veio (undefined), usamos nome ?? null → null
        // No SQL: COALESCE($1, nome) manterá o valor antigo quando $1 for NULL.
        const { rows } = await pool.query(
            "UPDATE produtos SET nome = COALESCE($1, nome), preco = COALESCE($2, preco) WHERE id = $3 RETURNING *",
            [nome ?? null, p, id]
        );

        if (!rows[0]) return res.status(404).json({ erro: "não encontrado" });
        res.json(rows[0]);
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});
//DELETAR (DELETE /produtos/:id)
app.delete("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ erro: "id inválido" });
    }

    try {
        // RETURNING id nos permite saber se algo foi realmente deletado.
        const r = await pool.query("DELETE FROM produtos WHERE id = $1 RETURNING id", [id]);

        // r.rowCount é o número de linhas afetadas. Se 0, o id não existia.
        if (!r.rowCount) return res.status(404).json({ erro: "não encontrado" });

        res.status(204).end(); // 204 = sucesso sem corpo de resposta
    } catch {
        res.status(500).json({ erro: "erro interno" });
    }
});

const PORT = process.env.PORT || 3000;
// Inicia o servidor na porta definida em PORT (3000 se indefinida)
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
