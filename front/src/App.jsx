import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Productos from "./pages/Productos.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Carrito from "./pages/Carrito.jsx";
import Checkout from "./pages/Checkout.jsx";

const App = () => {
  const { usuario } = useSelector((state) => state.usuario);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/carrito" element={<Carrito />} />
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
