import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [editoraId, setEditoraId] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);


  useEffect(() => {
    api.get("/autores").then(res => setAutores(res.data));
    api.get("/editoras").then(res => setEditoras(res.data));
  }, []);


  useEffect(() => {
  api.get(`/livros/${id}`)
    .then(res => {
      const livro = res.data;
      setTitulo(livro.titulo ?? "");
      setAnoPublicacao(livro.anoPublicacao ?? "");
      setIsbn(livro.isbn ?? "");
      setAutorId(livro.autor?.id?.toString() ?? "");
      setEditoraId(livro.editora?.id?.toString() ?? "");
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao carregar dados do livro.");
    });
}, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const livroAtualizado = {
      titulo,
      anoPublicacao: parseInt(anoPublicacao),
      isbn,
      autor: { id: parseFloat(autorId) },
      editora: { id: parseFloat(editoraId) }
    };

    try {
      await api.put(`/livros/${id}`, livroAtualizado);
      alert("Livro atualizado com sucesso!");
      navigate("/livros");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o livro.");
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
        Editar Livro
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
          type="text"
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

        <select value={autorId || ""} onChange={(e) => setAutorId(e.target.value)} required style={inputStyle}>
            <option value="">Selecione o Autor</option>
            {autores.map((autor) => (
                <option key={autor.id} value={autor.id.toString()}>{autor.nome}</option>
            ))}
            </select>

            <select value={editoraId || ""} onChange={(e) => setEditoraId(e.target.value)} required style={inputStyle}>
            <option value="">Selecione a Editora</option>
            {editoras.map((editora) => (
                <option key={editora.id} value={editora.id.toString()}>{editora.nome}</option>
            ))}
        </select>


        <button type="submit" style={buttonStyle}>Salvar Alterações</button>
        <button type="button" onClick={() => navigate("/livros")} style={buttonStyleBack}>← Voltar</button>
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
