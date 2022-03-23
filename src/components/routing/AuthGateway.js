import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthData from "~/hooks/useAuthData";

const AuthGateway = () => {
    let location = useLocation();
    let auth = useAuthData();

    if(!auth.userName) {
        return (
            <Navigate to="/login" state={{ from: location }} />
        );
    }

    return (<Outlet />);
};

export default AuthGateway;
