import React from "react";
import classNames from "~/utils/classnames";

import "./style.scss";

const Component = ({
    as: Elem = "p",
    bold,
    italic,
    underlined,
    centered,
    className,
    children,
    content,
    weight,

    style,
    color,
    ...props
}, ref) => (
    <Elem ref={ref} {...props} className={classNames(
        "text", className,
        bold && "is-bold",
        italic && "is-italic",
        underlined && "is-underlined",
        centered && "is-text-centered"
    )} style={{ "--color": color, "--weight": weight, ...style }} children={content || children} />
);

export default React.forwardRef(Component);
