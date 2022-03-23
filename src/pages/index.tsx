import { BrowserRouter, Routes } from "react-router-dom";
import Providers from "./Providers";

import HomePageRoutes from "./home/routes";

export default (
    <Providers>
        <BrowserRouter>
            <Routes>
                {HomePageRoutes}
                {/* {LandingPageRoutes} */}
            </Routes>
        </BrowserRouter>
    </Providers>
);
