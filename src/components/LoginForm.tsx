import { useState, type ChangeEvent } from "react";
import { API_URL, AUTH_URL, getFetchOption } from "../config/api";
import { loginContainer, loginError, loginInput } from "../styles/theme";

interface LoginFormProps {
    onLoginSuccess: (user: { id: number, email: string, role: string }) => void;
}
function LoginForm({ onLoginSuccess }: LoginFormProps) {
    //states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setEmail(e.currentTarget.value)
    };
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setPassword(e.currentTarget.value)
    };

    const onConnectClick = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_URL}${AUTH_URL}/login`,
                getFetchOption('POST', { email: email, password: password }));
            if (!response.ok) throw new Error(`Error ${response.status}`);

            const data = await response.json();
            if (data)
                onLoginSuccess({ id: data.id, email: data.email, role: data.role });

        } catch (error) {
            console.error(error);
            setError("Connexion Impossible");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={loginContainer}>
            <h2>Connexion</h2>
            {error && <span style={loginError}>{error}</span>}
            <div>
                <input style={loginInput} onChange={onEmailChange} placeholder="Email utilisateur" value={email}></input>
                <input style={loginInput} onChange={onPasswordChange} type="password" placeholder="Mot de passe" value={password}></input>
                <button style={{
                    opacity: isLoading ? 0.6 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }} disabled={isLoading} onClick={onConnectClick}>{isLoading ? 'Connexion...' : 'Se connecter'}</button>
            </div>
        </div>

    );
};

export default LoginForm;