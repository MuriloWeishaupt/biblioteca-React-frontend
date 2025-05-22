import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Livros() {
    const [livros, setLivros] = useState([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        api.get('/livros')
        .then(res => setLivros(res.data))
        .catch(err => console.error(err));
    }, []);


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
            maxWidth: '900px',
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
                </tr>
            ))}
            </tbody>
        </table>
        </div>

    )

}