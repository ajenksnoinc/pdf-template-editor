import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    as?: T;
};

const Loader = ({
    as: As = "div",
    className,
    ...passthrough
}: Props, ref) => (
    <As ref={ref} className={classNames("loading-spinner", className)} {...passthrough}>
        <img className="inner" src="/assets/res/spinner.svg" alt="Loading..." />
    </As>
);

export default React.forwardRef(Loader);
