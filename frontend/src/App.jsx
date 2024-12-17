import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import VerifyEmail from "./Pages/VerifyEmail.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import AppContainer from "./components/AppContainer.jsx";
import Profile from "./Pages/Profile.jsx";
import Settings from "./Pages/Settings.jsx";
import {setNavigate} from "./lib/navigation.js";

function App() {
    const navigate = useNavigate();

    setNavigate(navigate)

    return (
        <Routes>
            <Route path="/" element={<AppContainer />} >
                <Route index element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email/verify/:code" element={<VerifyEmail />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset" element={<ResetPassword />} />
        </Routes>
    );
}

export default App
