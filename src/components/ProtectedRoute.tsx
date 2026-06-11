import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isConnected } = useAuth();
    if (!isConnected) {
        return (<Navigate to='/login' replace />);
    }
    return (<>{children}</>);
}

export default ProtectedRoute