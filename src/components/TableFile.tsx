import { FormEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import api from "../api/axiosInstance";
import { IFile } from "../types/IFile";
import { Button } from "./ui/button";

export default function TableFile() {
  const [files, setFiles] = useState<IFile[]>([]);

  useEffect(() => {
    const files = async () => {
      await api
        .get("archivematica/files")
        .then((res) => {
          setFiles(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    files();
  }, []);

  const handlerDelete = (e: FormEvent<HTMLButtonElement>) => {
    api
      .delete(`archivematica/${e.currentTarget.value}`)
      .then(() => {})
      .catch((err) => {
        console.error("Erro ao deletar o arquivo.");
      });
  };

  const handlerDownload = (e: FormEvent<HTMLButtonElement>) => {
    const fileId = e.currentTarget.value;

    api
      .get(`archivematica/download/${fileId}`, { responseType: "blob" })
      .then((response) => {
        const contentDisposition = response.headers["content-disposition"]; // <-- corrigido para minúsculo

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          const fileName = fileNameMatch
            ? fileNameMatch[1]
            : "arquivo-desconhecido";

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        } else {
          console.error("Cabeçalho 'Content-Disposition' não encontrado.");
        }
      })
      .catch((err) => {
        console.log("Erro ao fazer o download.", err);
      });
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Nome do arquivo</TableHead>
          <TableHead>Tipo de arquivo</TableHead>
          <TableHead className="text-right">Tamanho do arquivo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium">{file.id}</TableCell>
            <TableCell>{file.originalname}</TableCell>
            <TableCell>{file.mimetype}</TableCell>
            <TableCell className="text-center">{file.size}</TableCell>
            <TableCell className="flex justify-end itens-center gap-5">
              <Button
                className="cursor-pointer font-bold"
                type="button"
                onClick={handlerDownload}
                value={file.id}
              >
                Baixar
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-500 cursor-pointer font-bold"
                type="button"
                onClick={handlerDelete}
                value={file.id}
              >
                Deletar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
