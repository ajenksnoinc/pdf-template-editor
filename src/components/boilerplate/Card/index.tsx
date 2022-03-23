import React from "react";
import classNames from "~/utils/classnames";

import CardHeader from "./CardHeader";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    as?: T;
};

function Card({
    as: As = "div",
    className,
    ...props
}: Props, ref) {
    return (
        <As ref={ref} {...props} className={classNames("card", className)} />
    );
}

const exported = React.forwardRef(Card);

// @ts-ignore
exported.Header = CardHeader;

export default exported;
export { default as CardHeader } from "./CardHeader";
export { default as CardBody } from "./CardBody";
