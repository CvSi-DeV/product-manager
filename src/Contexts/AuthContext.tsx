import { createContext, useContext, useState } from "react"
import { getLSInfo, removeLSInfo, setLSInfo } from "../config/api";

//Interface de description des élements du contexte
interface AuthContextType {
    token: string | null,
    login: (token: string) => void,
    logout: () => void,
    isConnected: boolean
};

//Initialisation des élements du contexte (valeur par défaut)
const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => { },
    logout: () => { },
    isConnected: false
});

//Valorisation des éléments du contexte
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(getLSInfo('token'));
    const isConnected = !!token;

    const login = (token: string) => {
        setLSInfo('token', token);
        setToken(token);
    };

    const logout = () => {
        removeLSInfo('token');
        setToken(null);
    };

    //Retourner le provider JSX
    return (
        <AuthContext.Provider value={{ token, login, logout, isConnected }} >
            {children}
        </AuthContext.Provider>
    );
};

//Diffusion des élements du contexte
// Custom hook exporté avec le Provider : pattern Context standard
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth doit être dans AuthProvider");
    return context;
};

export default AuthProvider;