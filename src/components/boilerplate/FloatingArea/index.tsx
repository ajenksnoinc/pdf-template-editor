import React from "react";
import classNames from "~/utils/classnames";

import Portal from "~/components/Portal";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

export type Props<T = "div"> = ReplaceableElementProps<T> & {
    as?: T;
};

const FloatingArea = ({
    floatParent,
    as: As = "div",
    area = "bottom-right",
    hasInner = true, // eslint-disable-line
    className,
    children,
    overlay,
    overlayAs: OverlayAs = "div",
    overlayVisible,
    onClickOverlay,
    innerProps: { as: InnerAs = "div", ...innerProps } = {},
    ...props
}: Props, ref) => (
    <Portal parent={floatParent}>
        <As className={classNames("floating-area", area && `is-${area}`, className)} ref={ref} {...props}>
            {overlay && (
                <OverlayAs className={classNames("overlay", overlayVisible && "is-open")} onClick={onClickOverlay} />
            )}
            <InnerAs {...innerProps} className="ui-layer">{children}</InnerAs>
        </As>
    </Portal>
);

export default React.forwardRef(FloatingArea);
