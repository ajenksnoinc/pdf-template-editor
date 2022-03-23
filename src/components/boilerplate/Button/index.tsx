import React from "react";
import classNames from "~/utils/classnames";

import Text from "~/components/display/Text";

import type { ReplaceableElementProps, ColorableElement, Size } from "~/types/boilerplate";

import Icon, { IconVariant } from "~/components/boilerplate/Icon";

import "./style.scss";

export interface ButtonIconProps {
    toggleable?: boolean;
    active?: boolean;

    icon?: string
    iconVariant?: IconVariant

    activeIcon?: string;
    activeIconVariant?: IconVariant;

    inactiveIcon?: string;
    inactiveIconVariant?: IconVariant;

    iconClassName?: string;
    iconAfter?: boolean;
}

export const ButtonVariants = ["normal", "rounded", "icon", "icon-square", "sharp", "outlined", "link"];

export type ButtonVariant = typeof ButtonVariants[number];

export type Props<T extends React.ElementType = any> = ReplaceableElementProps<T>
& ButtonIconProps
& ColorableElement
& {
    as?: T;
    localized?: boolean;
    variant?: ButtonVariant;
    iconComponent?: React.ElementType;
    label?: string;
    size?: Size;
    iconProps?: {};
};

export function ButtonIcon({
    toggleable,
    active,

    icon,
    iconVariant,

    activeIcon,
    activeIconVariant,

    inactiveIcon,
    inactiveIconVariant,

    iconClassName,
    ...iconProps
}: ButtonIconProps) {
    return (
        <Icon variant={(toggleable && (active ? activeIconVariant : inactiveIconVariant)) || iconVariant}
            icon={(toggleable && (active ? activeIcon : inactiveIcon)) || icon as string} className={iconClassName}
            {...iconProps} />
    );
}

function Button(props: Props, ref) {
    let {
        as: As = "button",
        className,
        type = "button",
        variant = "normal",
        toggleable,
        active,
        activeIcon,
        activeIconVariant,
        inactiveIcon,
        inactiveIconVariant,
        icon,
        iconVariant,
        iconComponent: IconComponent = ButtonIcon,
        iconClassName,
        iconAfter,
        iconProps = {},
        localized,
        label,
        style,
        color,
        textColor,
        size = "sm",
        children,
        ...passthrough
    } = props;

    let elementStyle = { "--btn-color": color, "--btn-text-color": textColor, ...style };

    let _icon = (icon || toggleable) && (
        <IconComponent key="_icn_lbl" {...{ toggleable, active, icon, iconVariant, activeIcon, activeIconVariant, inactiveIcon, inactiveIconVariant, iconClassName }} {...iconProps} />
    );

    let _label = (label || children) && (
        <Text key="_btn_label" as="span" className="btn-label" localized={localized} text={label} children={children} />
    );

    let _children = iconAfter ? [_label, _icon] : [_icon, _label];

    let classes = classNames("btn", `is-${size}`, `is-${variant}`, toggleable && active && "is-active", iconAfter && "is-icon-after", className);

    return (
        <As ref={ref} {...passthrough} className={classes} type={type} style={elementStyle} children={_children} />
    );
}

export default React.forwardRef(Button) as typeof Button;
