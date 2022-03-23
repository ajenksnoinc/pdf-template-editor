import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T extends React.ElementType = "nav"> = ReplaceableElementProps<T> & {
    variant?: string,
};

const Component = (props: Props, ref) => {
    let {
        as: As = "nav",
        className,
        variant = "normal",
        ...passthrough
    } = props;

    return (
        <As ref={ref} {...passthrough} className={classNames("navbar-bottom", variant && `is-${variant}`, className)} />
    );
};

export default React.forwardRef(Component);
