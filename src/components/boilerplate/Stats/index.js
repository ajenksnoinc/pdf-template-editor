import React from "react";
import classNames from "~/utils/classnames";

import Col from "../Col";
import Icon from "../Icon";

import "./style.scss";

const Component = ({ as: As = "div", className, rowSize = 4, options = [], ...props }, ref) => {
    let children = React.useMemo(() => options.map(option => (
        <Col key={`stats-item-${option.label}`} size={rowSize} className="item">
            <span className="label">{option.label}</span>
            <span className="value">{option.value}</span>
            {option.icon && (
                <Icon icon={option.icon} />
            )}
        </Col>
    )), [ options, rowSize ]);

    return (
        <As ref={ref} {...props} className={classNames("stats", className)}>{children}</As>
    );
};

export default React.forwardRef(Component);
