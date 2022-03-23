import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T extends React.ElementType = "span"> = ReplaceableElementProps<T>;

const Component = (props: Props, ref) => {
    let {
        as: As = "span",
        className,
        ...passthrough
    } = props;

    return (
        <As ref={ref} {...passthrough} className={classNames("badge", className)} />
    );
};

export default React.forwardRef(Component);
