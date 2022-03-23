import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    as?: T;
};

function Row(props: Props, ref) {
    let { as: As = "div", className, ...passthrough } = props;

    return (
        <As ref={ref} {...passthrough} className={classNames("row", className)} />
    );
}

export default React.forwardRef(Row);
