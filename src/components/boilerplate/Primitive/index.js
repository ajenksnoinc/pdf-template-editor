import React from "react";
import classNames from "~/utils/classnames";

import "./style.scss";

const Component = ({
    as: Elem = "div",
    className,
    shape = "square",
    zDisplay,
    children,
    innerProps = {},
    innerClassName,
    // size,
    color,
    style,
    ...props
}, ref) => (
    <Elem ref={ref} className={classNames("primitive", shape && `is-${shape}`, zDisplay && `is-z-${zDisplay}`, className)} {...props} fill-color="" style={{ ...style, "--fill-color": color }}>
        <div {...innerProps} className={classNames("content", innerClassName, innerProps.className)}>{children}</div>
    </Elem>
);

export default React.forwardRef(Component);
