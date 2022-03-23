import { Route } from "react-router-dom";
import loadLazy from "~/utils/lazy";

const HomePage = loadLazy(() => import("./"));

const HomePageRoutes = (
    <Route path="/" element={<HomePage />} />
);

export default HomePageRoutes;
