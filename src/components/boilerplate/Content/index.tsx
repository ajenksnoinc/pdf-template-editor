import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    as?: T;
};

function Content(props: Props, ref) {
    let {
        as: As = "div",
        className,
        ...passthrough
    } = props;


    return (
        <As ref={ref} className={classNames("content-box", className)}{...passthrough} />
    );
}

export default React.forwardRef(Content);
