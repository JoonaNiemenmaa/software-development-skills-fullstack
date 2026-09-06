import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "./AuthContext";
import NavBar from "./components/NavBar";
import Create from "./pages/Create";
import CheckToken from "./components/CheckToken";

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <BrowserRouter>
            <AuthContext value={token}>
                <NavBar setToken={setToken} />
                <Routes>
                    <Route
                        path="/login"
                        element={<Login setToken={setToken} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<CheckToken />}>
                        <Route index element={<Index />} />
                        <Route path="create" element={<Create />} />
                    </Route>
                </Routes>
            </AuthContext>
        </BrowserRouter>
    );
};

export default App;
