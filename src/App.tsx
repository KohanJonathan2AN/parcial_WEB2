import { BrowserRouter, Routes, Route } from "react-router-dom"
import { FormularioRegistro } from "./components/FormularioRegistro";
import { RecuperacionPosts} from "./components/FormularioPost";
// import { CreacionPost } from "./components/CreacionPost";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Registro" element={<FormularioRegistro />} />
        <Route path="/ListaDePosts" element={<RecuperacionPosts />} />
        {/* <Route path="/CrearPost" element={<CreacionPost />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
