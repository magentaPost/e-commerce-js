import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/usuarioSlice";

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);

  useEffect(() => {
    /* console.log("Hook montado"); */

    // Si NO hay usuario → no hacemos nada
    if (!usuario) return;

    const expiration = localStorage.getItem("tokenExpiration");
    if (!expiration) return;

    const remainingTime = +expiration - Date.now();

    if (remainingTime <= 0) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
    }, remainingTime);

    return () => clearTimeout(timer);
  }, [dispatch, usuario]);
};

export default useAutoLogout;
