import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthContext from "./AuthContext";
import NavBar from "./components/NavBar";
import Create from "./pages/Create";
import CheckLogin from "./components/CheckToken";

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <BrowserRouter>
            <AuthContext value={user}>
                <NavBar setUser={setUser} />
                <Routes>
                    <Route
                        path="/login"
                        element={<Login setUser={setUser} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<CheckLogin setUser={setUser} />}>
                        <Route index element={<Index />} />
                        <Route path="create" element={<Create />} />
                    </Route>
                </Routes>
            </AuthContext>
        </BrowserRouter>
    );
};

export default App;
