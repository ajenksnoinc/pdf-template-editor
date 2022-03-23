import React from "react";
import Loaders from "~/services/LoadingSkeleton";
// import LocalizedText from "../i18n";

import type { ReplaceableElementProps } from "~/types/boilerplate";

const renderSegment = seg => {
    if(typeof seg === "string")
        return seg.replace(/\s/gmi, "\xa0"); // Non-breaking space

    return seg;
};

export type Props<T extends React.ElementType> = ReplaceableElementProps<T> & {
    as?: T;
    localized?: boolean;
    text?: string;
    prefix?: React.ReactChild;
    suffix?: React.ReactChild;
    width?: string | number;
    height?: string | number;
    loadingProps?: any;
}

function Text<T extends React.ElementType = "p">({
    as: As = "p",
    /* localized, */
    text,
    children,
    prefix,
    suffix,
    width,
    height,
    loadingProps,
    ...passthrough
}: Props<T>, ref) {
    let showLoader = Loaders.useLoadingKey(passthrough as any);

    return (
        <As {...passthrough} ref={ref}>
            {renderSegment(prefix)}
            {showLoader ? (
                Loaders.showLoader({ width, height, ...loadingProps })
            ) : (
                /* localized ? <LocalizedText tag={text || children} /> : */ text || children
            )}
            {renderSegment(suffix)}
        </As>
    );
}

export default React.forwardRef(Text);
