import React from "react";
import { Properties } from "csstype";

export type ReplaceableElementProps<T> = React.ComponentProps<T> & {
    as?: T;
    children?: React.ReactNode;
    style?: Properties;
    className?: string;

    [key: string]: any;
};

export type ColorableElement = {
    color?: string;
    textColor?: string;
};

export type StylePassthroughElementProps<T> = Properties<T> & {
    as?: T;
    className?: string;
};

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
