import React from "react";
import classNames from "~/utils/classnames";

import Icon from "../Icon";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T extends React.ElementType = "div"> = ReplaceableElementProps<T> & {
    path?: React.ElementType[]
};

const Component = (props: Props, ref) => {
    let {
        as: As = "div",
        path = [],
        className,
        children,
        ...passthrough
    } = props;

    let contents = React.useMemo(() => {
        let val: any[] = [];

        for(let i in path) {
            val.push(
                <Icon key={`breadcrumb-separator-${i}`} className="step-separator" icon="chevron_right" />
            );

            val.push(
                <span key={`breadcrumb-step-${i}`} className="step">{path[i]}</span>
            );
        }

        return val.slice(1);
    }, [ path ]);

    return (
        <As ref={ref} {...passthrough} className={classNames("breadcrumbs", className)}>
            {children}
            {contents}
        </As>
    );
};

export default React.forwardRef(Component);
