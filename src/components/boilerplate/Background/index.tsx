import React from "react";
import classNames from "~/utils/classnames";

import type { StylePassthroughElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T = "div"> = StylePassthroughElementProps<T> & {
    ref?: React.Ref<T>;
    children?: React.ReactChildren;
    active?: boolean;
};

function Background(props: Props, ref) {
    let {
        as: As = "div",
        active,
        children,
        ...style
    } = props;

    return (
        <As ref={ref} className={classNames("background", active && "is-active")} style={style}>{children}</As>
    );
}

export default React.forwardRef(Background);
