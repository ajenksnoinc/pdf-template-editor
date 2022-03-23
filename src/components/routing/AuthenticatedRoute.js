import React from "react";
import { Route } from "react-router-dom";

import AuthGateway from "~/components/routing/AuthGateway";

const AuthenticatedRoute = (routes) => (
    <Route element={<AuthGateway />}>{routes}</Route>
);

export default AuthenticatedRoute;
