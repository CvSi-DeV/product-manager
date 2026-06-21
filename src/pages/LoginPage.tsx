import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "../Contexts/AuthContext";

function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate();

    const handleLoginSuccess = (user: { id: number, email: string, role: string }) => {
        login(user);
        navigate('/products');
    }

    return (<LoginForm onLoginSuccess={handleLoginSuccess} />);
}

export default LoginPage;