import React from "react";
import classNames from "~/utils/classnames";

export default ({
    message,
    type = "danger",
    className,
    ...props
}) => (
    <div className={classNames("alert", `alert-${type}`, className)} {...props}>{message}</div>
);
