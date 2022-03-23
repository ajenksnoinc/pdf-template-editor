import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

type Span = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    sizes?: Span[];
    size?: Size;
    span?: Span;
};

function Col(props: Props, ref) {
    let {
        as: As = "div",
        sizes = [],
        size,
        span,
        className,
        ...passthrough
    } = props;

    let col = "col";

    if(size)
        col += `-${size}`;
    if(span)
        col += `-${span}`;

    return (
        <As ref={ref} {...passthrough} className={classNames((size||span) && "col", col, ...sizes.map(x => `col-${x}`), className)} />
    );
}

export default React.forwardRef(Col);
