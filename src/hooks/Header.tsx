import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Header() {
  const navigator = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    navigator("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800">
        Sistema de Arquivos
      </h1>

      <button
        onClick={signOut}
        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sair
      </button>
    </header>
  );
}
