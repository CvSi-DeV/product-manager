import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isConnected, isLoading } = useAuth();
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                ⏳ Chargement ...
            </div>)
    }
    if (!isConnected) {
        return (<Navigate to='/login' replace />);
    }
    return (<>{children}</>);
}

export default ProtectedRoute