import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    as?: T;
};

function CardHeader({
    as: As = "div",
    className,
    ...props
}: Props, ref) {
    return (
        <As ref={ref} {...props} className={classNames("card-header", className)} />
    );
}

export default React.forwardRef(CardHeader);
