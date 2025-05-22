import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Livros from "./pages/Livros";
import CadastroLivro from "./pages/CadastroLivro";
import CadastroAutor from "./pages/CadastroAutor";
import CadastroEditora from "./pages/CadastroEditora";
import EditarLivro from "./pages/EditarLivro";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Livros/>}/>
        <Route path="/cadastro-livro" element={<CadastroLivro/>}/>
        <Route path="/cadastro-autor" element={<CadastroAutor />} />
        <Route path="/cadastro-editora" element={<CadastroEditora />} />
        <Route path="/editar-livro/:id" element={<EditarLivro />} />
        <Route path="*" element={<Livros/>}/>
      </Routes>
    </Router>
  );
}

export default App;