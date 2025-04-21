import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FormEvent, useRef } from "react";
import api from "@/api/axiosInstance";

export function InputFile() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: FormEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // nome esperado pelo backend

    try {
      const response = await api.post("/archivematica/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Arquivo enviado com sucesso:", response.data);
      // Aqui você pode exibir uma notificação de sucesso, limpar o input, etc.
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      // Aqui você pode exibir uma notificação de erro
    }
  };

  return (
    <div className="flex justify-end">
      <input
        ref={fileInputRef}
        id="file"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      <Label htmlFor="file" className="sr-only">
        Adicionar arquivo
      </Label>
      <Button
        type="button"
        onClick={handleClick}
        variant="outline"
        className="gap-2"
      >
        <Upload className="w-4 h-4" />
        Adicionar arquivo
      </Button>
    </div>
  );
}
