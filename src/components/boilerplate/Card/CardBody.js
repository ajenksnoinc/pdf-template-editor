import React from "react";
import classNames from "~/utils/classnames";

const Component = ({ className, ...props }, ref) => (
    <div ref={ref} {...props} className={classNames("card-body", className)} />
);

export default React.forwardRef(Component);
