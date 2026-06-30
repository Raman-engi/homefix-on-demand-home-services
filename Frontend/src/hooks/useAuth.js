import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/slice/authSlice";
import { clearAll } from "../utils/storage";

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, role, token } = useSelector(
    (state) => state.auth,
  );

  const login = (userData, tokenData) => {
    // Implemented in authService/slice
  };

  const logout = () => {
    clearAll();
    dispatch(logoutAction());
  };

  return { user, isAuthenticated, login, logout, role, token };
};

export default useAuth;
