import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserContext } from "./App";

const useAuth = () => {
    const {user} = useContext(UserContext);

    return user.loggedIn;
};

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to={'/login'} replace state={{ from: location }}/>;
};

export default ProtectedRoutes;