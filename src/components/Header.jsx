import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();

    return (
        <header style={{
            backgroundColor: "#2E4A62",
            padding: "1rem",
            color: "#fff",
            textAlign: "center"
        }}>
            <h2 style={{ margin: 0 }}>Biblioteca Digital</h2>
            <br />

            <div style={{  }}>
            <button
                onClick={() => navigate("/cadastro-livro")}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    backgroundColor: "#07304a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "5px"
                }}> + Adicionar Livro</button>
                <button
                onClick={() => navigate("/cadastro-autor")}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    backgroundColor: "#07304a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "5px"
                }}> + Adicionar Autor</button>
                <button
                onClick={() => navigate("/cadastro-editora")}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    backgroundColor: "#07304a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "5px",
                }}> + Adicionar Editora</button>
        </div>

        </header>
    )
}