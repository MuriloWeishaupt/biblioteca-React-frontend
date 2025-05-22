import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

export default function Livros() {
    const [livros, setLivros] = useState([]);
    const [busca, setBusca] = useState('');


    useEffect(() => {
        api.get('/livros')
        .then(res => setLivros(res.data))
        .catch(err => console.error(err));
    }, []);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
        try {
        await api.delete(`/livros/${id}`);
        setLivros((prev) => prev.filter((livro) => livro.id !== id));
        alert("Livro excluído com sucesso!");
        } catch (err) {
        console.error(err);
        alert("Erro ao excluir livro.");
        }
    }
    };



    const livrosFiltrados = livros.filter(livro => 
        Object.values(livro).some(valor => typeof valor === "string" && valor.toLowerCase().includes(busca.toLowerCase()))
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            backgroundColor: '#1f1f1f',
            color: '#fff',
            padding: '2rem'
            }}>
        <h1 style={{
            backgroundColor: '#3c5a78',
            color: '#fff',
            padding: '1rem 2rem',
            borderRadius: '8px',
            marginBottom: '2rem'
        }}>
            Biblioteca Digital
        </h1>

        
        <input 
            type="text"
            placeholder="Buscar Livro..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
                marginBottom: "20px",
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                fontSize: "16px"
            }} />

        <h2 style={{ marginBottom: '1rem' }}>Lista de Livros</h2>

        <table style={{
            width: '100%',
            maxWidth: '1200px',
            textAlign: "center",
            borderCollapse: 'collapse',
            backgroundColor: '#1f1f1f',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
            <thead style={{ backgroundColor: '#8FA8C8' }}>
            <tr>
                <th style={{ padding: '10px', textAlign: 'left' }}>Títulos</th>
                <th>Autor</th>
                <th>Editora</th>
                <th>Ano</th>
                <th>ISBN</th>
                <th>Ações</th> 
            </tr>
            </thead>
            <tbody>
            {livrosFiltrados.map((livro) => (
                <tr key={livro.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ padding: '10px' }}>{livro.titulo}</td>
                <td>{livro.autor?.nome}</td>
                <td>{livro.editora?.nome}</td>
                <td>{livro.anoPublicacao}</td>
                <td>{livro.isbn}</td>
                <td style={{ display: 'flex', gap: '10px' }}>
                    <button
                    style={botaoEditar}
                    onClick={() => navigate(`/editar-livro/${livro.id}`)}
                    >
                    Editar
                    </button>
                    <button
                    style={botaoExcluir}
                    onClick={() => handleDelete(livro.id)}
                    >
                    Excluir
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

    )

}

const botaoEditar = {
  padding: "6px 12px",
  margin: "5px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const botaoExcluir = {
  padding: "6px 12px",
  margin: "5px",
  backgroundColor: "#E74C3C",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};
