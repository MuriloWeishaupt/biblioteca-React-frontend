import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CadastroLivro() {
    const [titulo, setTitulo] = useState("");
    const [autorId, setAutorId] = useState("");
    const [editoraId, setEditoraId] = useState("");
    const [anoPublicacao, setAnoPublicacao] = useState("");
    const [isbn, setIsbn] = useState("");
    const [autores, setAutores] = useState([]);
    const [editoras, setEditoras] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("/autores").then(res => setAutores(res.data));
        api.get("/editoras").then(res => setEditoras(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!autorId || !editoraId) {
            alert("Selecione autor e editora.");
            return;
        }

        setLoading(true);

        const novoLivro = {
            titulo,
            anoPublicacao: parseInt(anoPublicacao),
            isbn,
            autor: { id: parseFloat(autorId) },
            editora: { id: parseFloat(editoraId) }
        };

        try {
            await api.post("/livros", novoLivro);
            if (isNaN(parseInt(anoPublicacao))) {
                alert("Ano de publicação inválido!");
                return;
            }
            alert("Livro cadastrado com sucesso!");
            navigate("/livros");
        } catch (err) {
            console.error(err);
            alert("Erro ao cadastrar o livro.");
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#1f1f1f",
            color: "#fff",
            padding: "2rem"
        }}>
            <h1 style={{
                backgroundColor: "#3c5a78",
                padding: "1rem 2rem",
                borderRadius: "8px",
                marginBottom: "2rem"
            }}>
                Cadastrar Novo Livro
            </h1>

            

            <form onSubmit={handleSubmit} style={{ maxWidth: "500px", width: "100%", display: "flex", flexDirection: "column", gap: "15px" }}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Ano de Publicação"
                    value={anoPublicacao}
                    onChange={(e) => setAnoPublicacao(e.target.value)}
                    required
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="ISBN"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                    style={inputStyle}
                />

                <select value={autorId} onChange={(e) => setAutorId(e.target.value)} required style={inputStyle}>
                    <option value="">Selecione o Autor</option>
                    {autores.map((autor) => (
                        <option key={autor.id} value={autor.id}>{autor.nome}</option>
                    ))}
                </select>

                <select value={editoraId} onChange={(e) => setEditoraId(e.target.value)} required style={inputStyle}>
                    <option value="">Selecione a Editora</option>
                    {editoras.map((editora) => (
                        <option key={editora.id} value={editora.id}>{editora.nome}</option>
                    ))}
                </select>

                <button type="submit" style={buttonStyle}>Salvar</button>
                
                <button onClick={() => navigate("/livros")} style={buttonStyleBack}>← Voltar</button>

            </form>
        </div>
    );
}

const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px"
};

const buttonStyle = {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
};

const buttonStyleBack = {
    padding: "12px",
    backgroundColor: "#8FA8C8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
};
