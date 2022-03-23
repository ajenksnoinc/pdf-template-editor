import React, { useMemo } from "react";
import classNames from "~/utils/classnames";
import { context } from "./Theme";
import { syncElements } from "~/utils/animationSync";
import withId from "~/hooks/withId";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

// Synchronize all skeleton elements' animations on the page. Looks really good!
syncElements("skeleton");

export type Props<T = "span"> = ReplaceableElementProps<T> & {
    as?: T;
    count?: number;
    circle?: boolean;
    width?: any;
    height?: any;
    duration?: string;
    placeholderClassName?: string;
    rows?: number;
    tableSize?: any;
};

function Skeleton(props: Props) {
    let {
        as: As = "span",
        count = 1,
        duration = "1.2s",
        width,
        height,
        circle = false,
        className,
        placeholderClassName,
        style,
        rows,
        tableSize
    } = props;

    let id = withId();
    let { base, highlight } = React.useContext(context);

    let styles = { "--base": base, "--highlight": highlight, "--duration": duration, "--width": width, "--height": height, ...style };

    if(tableSize) {
        return (
            <React.Fragment>
                {Array(count).fill(0).map((_,i) => (
                    <tr key={`skeleton-tr-${i}`} className={classNames("skeleton is-tr", className)} style={styles}>
                        <td colSpan={tableSize as any} className={placeholderClassName}>&zwnj;</td>
                    </tr>
                ))}
            </React.Fragment>
        );
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    let elements = useMemo(() => Array(count).fill(0).map((_,i) => (
        // "zwnj" - Zero-width non-joiner
        <As key={`${id}-${i}`} className={placeholderClassName}>&zwnj;</As>
    )), [ count, placeholderClassName, As, id ]);

    let classes = classNames("skeleton", rows && "is-rows", circle && "is-circle", className);

    return (
        <span className={classes} style={styles}>{elements}</span>
    );
}

export default Skeleton;
