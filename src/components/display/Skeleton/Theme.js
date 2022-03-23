import React from "react";

export const defaults = {
    base: "#eee",
    highlight: "#f5f5f5"
};

const CTX = React.createContext(defaults);

export const context = CTX;

export default ({ base, highlight, children }) => (
    <CTX.Provider value={{ ...defaults, base, highlight }} children={children} />
);
