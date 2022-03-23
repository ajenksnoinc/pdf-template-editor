import React from "react";
import classNames from "~/utils/classnames";

import "./style.scss";

const Component = ({ as: As = "div", className, ...props }, ref) => (
    <As ref={ref} {...props} className={classNames("spinner", className)} />
);

export default React.forwardRef(Component);
