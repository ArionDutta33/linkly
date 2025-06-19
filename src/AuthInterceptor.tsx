import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./provider/AuthProvider";

const AuthInterceptor = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 403) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [logout]);

  return null; // This component doesn't render anything
};

export default AuthInterceptor;
