import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    as?: T;
};

function Container(props: Props, ref) {
    let { as: As = "div", className, ...passthrough } = props;

    return (
        <As ref={ref} {...passthrough} className={classNames("container", className)} />
    );
}

export default React.forwardRef(Container);
