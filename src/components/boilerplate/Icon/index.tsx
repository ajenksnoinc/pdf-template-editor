import React from "react";
import classNames from "~/utils/classnames";
import { useStylesheet } from "~/hooks/styling/useStylesheet";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

const sheets = {
    "normal": "https://fonts.googleapis.com/icon?family=Material+Icons",
    "outline": "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined",
    "round": "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    "twotone": "https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone",
    "sharp": "https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
};

export type IconVariant = "normal" | "outline" | "round" | "twotone" | "sharp";

export type Props<T = "i"> = ReplaceableElementProps<T> & {
    as?: T;
    variant?: IconVariant;
    icon: string;
}

function Icon(props: Props, ref) {
    let {
        as: As = "i",
        variant = "normal",
        className,
        icon,
        ...passthrough
    } = props;

    useStylesheet(sheets[variant]);

    return (
        <As {...passthrough} ref={ref} className={classNames("icon", `variant-${variant}`, className)}>{icon}</As>
    );
}

export default React.forwardRef(Icon) as typeof Icon;
