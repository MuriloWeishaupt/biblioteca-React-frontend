import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Livros from "./pages/Livros";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Livros/>}/>
      </Routes>
    </Router>
  );
}

export default App;