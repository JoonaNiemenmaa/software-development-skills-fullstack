import { BrowserRouter, Route, Routes } from "react-router"
import { useState } from "react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "./AuthContext";
import NavBar from "./components/NavBar";

const App = () => {

  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <AuthContext value={token}>
        <NavBar setToken={setToken}/>
        <Routes>
            <Route path="/" element={ <Index/> } />
            <Route path="/login" element={ <Login setToken={setToken}/> } />
            <Route path="/register" element={ <Register /> } />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  )
}

export default App;
