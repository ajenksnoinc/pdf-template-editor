import React from "react";
import classNames from "~/utils/classnames";

import type { ReplaceableElementProps } from "~/types/boilerplate";

import "./style.scss";

type NavbarVariant = "sticky" | "raised";

interface NavbarLogo {
    src: string;
}

export type Props<T = "nav"> = ReplaceableElementProps<T> & {
    as?: T;
    variant?: NavbarVariant;
    clickable?: boolean;
    logo?: NavbarLogo | string;
    logoAlt?: string;
    logoProps?: React.ComponentProps<"img">;
};

function Navbar(props: Props, ref) {
    let {
        as: As = "nav",
        className,
        variant = "normal",
        clickable,
        logo,
        logoAlt,
        logoProps,
        onClick,
        children,
        ...passthrough
    } = props;

    let handleClick = React.useCallback(e => {
        e.persist();
        if(clickable)
            return onClick && onClick(e);
    }, [ clickable, onClick ]);

    return (
        <As ref={ref} className={classNames("navbar", variant && `is-${variant}`, clickable && "is-clickable", className)} onClick={handleClick} {...passthrough}>
            {(logo || logoProps) && (
                <img {...logoProps} className={classNames("logo", logoProps?.className)} alt={logoAlt || logoProps?.alt} src={(logo as NavbarLogo)?.src || logo as string || ""} />
            )}
            {children}
        </As>
    );
}

export default React.forwardRef(Navbar);
