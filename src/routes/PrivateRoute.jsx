import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
  
    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/signin"></Navigate>;
};

export default PrivateRoute;