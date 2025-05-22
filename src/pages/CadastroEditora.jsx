import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CadastroEditora() {
    const [nome, setNome] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome.trim()) return alert("Digite o nome da editora.");

        setLoading(true);
        try {
            await api.post("/editoras", { nome });
            alert("Editora cadastrada com sucesso!");
            navigate("/editoras"); 
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar editora.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Cadastrar Nova Editora</h1>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="text"
                    placeholder="Nome da Editora"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? "Salvando..." : "Salvar"}
                </button>
                <button onClick={() => navigate("/livros")} style={buttonStyleBack}>← Voltar</button>
            </form>
        </div>
    );
}


const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: "2rem"
};

const titleStyle = {
    backgroundColor: "#3c5a78",
    padding: "1rem 2rem",
    borderRadius: "8px",
    marginBottom: "2rem"
};

const formStyle = {
    maxWidth: "500px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
};

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

