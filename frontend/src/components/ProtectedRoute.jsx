import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(Object.keys(user) )
console.log("protected route mein ")
  if (!user || !user.token) {
    console.log('token hai toh hai ')
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
