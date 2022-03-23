import { forwardRef } from "react";
import Button, { Props as ButtonProps } from "../index";

import Portal from "~/components/Portal";

import classNames from "~/utils/classnames";

export type Position = "top-left" | "top-right" | "bottom-right" | "bottom-left";

export type Props = ButtonProps & {
    position?: Position
};

const regionFlexClasses = {
    "top-left":     ["has-justified-start", "has-aligned-start"],
    "top-right":    ["has-justified-end", "has-aligned-start"],
    "bottom-right": ["has-justified-end", "has-aligned-end"],
    "bottom-left":  ["has-justified-start", "has-aligned-end"]
};

function FloatingActionButton(props: Props, ref) {
    let { position = "bottom-right", ...passthrough } = props;

    return (
        <Portal>
            <div className={classNames("is-floating-region", ...regionFlexClasses[position])}>
                <Button ref={ref} variant="icon" {...passthrough} />
            </div>
        </Portal>
    );
}

export default forwardRef(FloatingActionButton);
