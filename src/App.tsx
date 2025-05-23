import { Routes, Route, Navigate } from "react-router-dom";
import SingIn from "./pages/SingIn";
import PrivateRouter from "./api/PrivateRouter";
import TableFile from "./hooks/TableFile";
import { FormUser } from "./pages/FormUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<SingIn />} />
        <Route path="/cadastrar" element={<FormUser />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route element={<PrivateRouter />}>
          <Route path="/home" element={<TableFile />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
