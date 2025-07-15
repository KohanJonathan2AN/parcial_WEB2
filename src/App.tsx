import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FormularioRegistro } from "./components/FormularioRegistro";
import { RecuperacionPosts} from "./components/FormularioPost";
import { CrearPost } from "./components/CrearPost";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Registro" element={<FormularioRegistro />} />
        <Route path="/ListaDePosts" element={<RecuperacionPosts />} />
        <Route path="/CrearPost" element={<CrearPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
