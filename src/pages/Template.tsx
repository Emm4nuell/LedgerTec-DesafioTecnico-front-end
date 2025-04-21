import Header from "@/components/Header";
import { InputFile } from "@/components/InputFile";
import { Outlet } from "react-router-dom";

export default function Template() {
  return (
    <div className="flex flex-col gap-10 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Header />
      <div className="w-[95%] max-w-6xl p-6 m-auto bg-white rounded-2xl shadow-lg border border-gray-200 h-[80vh] overflow-y-auto">
        <InputFile />
        <Outlet />
      </div>
    </div>
  );
}
