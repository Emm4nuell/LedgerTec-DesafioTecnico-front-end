import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Template from "@/pages/Template";

export default function PrivateRouter() {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Carregando...</div>; // Ou qualquer outra página de loading
  }
  if (!token) {
    navigate("/login");
  }

  return token ? <Template /> : <Navigate to={"/login"} replace />;
}
