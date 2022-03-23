/* eslint-disable no-unused-vars */
import React = require("react");

declare module "react" {
    function forwardRef<T>(component: T): T;
}
