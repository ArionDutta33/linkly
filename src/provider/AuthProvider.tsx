import { api } from "@/lib/api";
import { createContext, useContext } from "react";
import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";

type User = {
  token: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  registeruser: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  token: string;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setUser(response.data);
      setToken(response.data.token);
      localStorage.setItem("authtoken", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;
        throw new Error(
          apiError?.details || apiError?.message || error.message
        );
      }

      throw new Error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const registeruser = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      await api.post(
        "/auth/register",
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;
        throw new Error(
          apiError?.details || apiError?.message || error.message
        );
      }

      throw new Error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authtoken");
    setIsAuthenticated(false);
    setUser(null);
    setToken("");
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      setIsAuthenticated(true);
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        registeruser,
        loading,
        logout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
