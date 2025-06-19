import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./provider/AuthProvider.tsx";
import AuthInterceptor from "./AuthInterceptor.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <AuthInterceptor />
      <ThemeProvider>
        <App />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
