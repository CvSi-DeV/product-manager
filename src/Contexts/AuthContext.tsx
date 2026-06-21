import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, AUTH_URL, getFetchOption } from "../config/api";

//Interface de description des élements du contexte
interface AuthContextType {
    user: { id: number, email: string, role: string } | undefined,
    login: (user: { id: number, email: string, role: string }) => void,
    logout: () => void,
    isConnected: boolean,
    isLoading: boolean
};

//Initialisation des élements du contexte (valeur par défaut)
const AuthContext = createContext<AuthContextType>({
    user: undefined,
    login: () => { },
    logout: () => { },
    isConnected: false,
    isLoading: false
});

//Valorisation des éléments du contexte
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<{ id: number, email: string, role: string }>();
    const isConnected = !!user;
    const [isLoading, setIsLoading] = useState(true);

    const login = (user: { id: number, email: string, role: string }) => {
        setUser(user);
    };

    const logout = async () => {
        const response = await fetch(`${API_URL}${AUTH_URL}/logout`, getFetchOption('POST'));
        if (response.ok)
            setUser(undefined);
    };

    useEffect(() => {
        const checkConnected = async () => {
            const response = await fetch(`${API_URL}${AUTH_URL}/me`, getFetchOption('GET'));
            if (response.ok) {
                const data = await response.json();
                setUser({ id: data.id, email: data.email, role: data.role })
            }
            setIsLoading(false);
        };
        checkConnected();
    }, []);

    //Retourner le provider JSX
    return (
        <AuthContext.Provider value={{ user, login, logout, isConnected, isLoading }} >
            {children}
        </AuthContext.Provider >
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