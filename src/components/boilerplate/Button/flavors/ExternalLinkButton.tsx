import { forwardRef } from "react";
import Button, { Props } from "../index";

function ExternalLinkButton(props: Props, ref) {
    let { as = "a", ...passthrough } = props;

    return (
        <Button ref={ref} as={as} target="_blank" rel="noopener noreferrer" {...passthrough} />
    );
}

export default forwardRef(ExternalLinkButton);
