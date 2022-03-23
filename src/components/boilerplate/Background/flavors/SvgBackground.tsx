import React from "react";

import Background, { Props as BackgroundProps } from "../index";

export type Props = BackgroundProps & {
    background?: string;
};

function SvgBackground(props: Props, ref) {
    let { background, ...passthrough } = props;

    return (
        <Background {...passthrough} ref={ref}
            backgroundImage={`url(${background})`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center" />
    );
}

export default React.forwardRef(SvgBackground);
