import { forwardRef } from "react";
import Button, { Props } from "../index";
import { Link } from "react-router-dom";

function LinkButton(props: Props, ref) {
    let { as = Link, ...passthrough } = props;

    return (
        <Button ref={ref} as={as} {...passthrough} />
    );
}

export default forwardRef(LinkButton);
