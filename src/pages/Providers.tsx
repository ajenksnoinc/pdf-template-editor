import React from "react";

import ModalProvider from "~/components/boilerplate/Modal/ModalProvider";
import { ToastContainer } from "react-toastify";
// import { Provider } from "~/state";

// This is where you specify all global-level providers (e.g. Material-UI, global contexts, redux provider, etc.)
const Providers = ({ children }: React.PropsWithChildren<{}>) => (
    <React.Fragment>
        {children}

        <ModalProvider />

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover />
    </React.Fragment>
);

export default Providers;
