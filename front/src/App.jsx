import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import useAutoLogout from "./hooks/useAutoLogout.js";
import "../src/style/styles.css"
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import MotoDetalle from "./pages/MotoDetalle.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Checkout from "./pages/Checkout.jsx";
import Carrito from "./pages/Carrito.jsx";
import Welcome from "./pages/Welcome.jsx";

const App = () => {

  useAutoLogout();
  const { usuario } = useSelector((state) => state.usuario);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<MotoDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/checkout"
          element={usuario ? <Checkout /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
