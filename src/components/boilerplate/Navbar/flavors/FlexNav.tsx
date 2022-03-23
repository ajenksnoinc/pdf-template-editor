import React from "react";
import classNames from "~/utils/classnames";

import Navbar, { Props } from "../index";

export type { Props } from "../index";

function FlexNav(props: Props, ref) {
    let { className, ...passthrough } = props;

    return (
        <Navbar ref={ref} className={classNames("is-flex has-aligned-center has-justified-between", className)} {...passthrough} />
    );
}

export default React.forwardRef(FlexNav);
