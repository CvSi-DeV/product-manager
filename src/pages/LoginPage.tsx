import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../Contexts/AuthContext";

function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate();

    const handleLoginSuccess = (token: string) => {
        login(token);
        navigate('/products');
    }

    return (<LoginForm onLoginSuccess={handleLoginSuccess} />);
}

export default LoginPage;