import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FormularioRegistro } from "./components/FormularioRegistro";
import { RecuperacionPosts} from "./components/FormularioListaPosts";
import { CrearPost } from "./components/FormularioPost";
import { RecuperacionRegistros} from "./components/FormularioListaRegistros";
import { EditarPost} from "./components/FormularioEditarPost";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Registro" element={<FormularioRegistro />} />
        <Route path="/ListaDePosts" element={<RecuperacionPosts />} />
        <Route path="/CrearPost" element={<CrearPost />} />
        <Route path="/ListaRegistros" element={<RecuperacionRegistros />} />
        <Route path="/EditarPost/:id" element={<EditarPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
