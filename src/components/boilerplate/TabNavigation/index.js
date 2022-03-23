import React from "react";
import classNames from "~/utils/classnames";

import { motion, AnimateSharedLayout } from "framer-motion";
import Icon from "~/components/boilerplate/Icon";

import "./style.scss";

const Component = ({
    as: As = "div",
    tabs = [],
    selectedTab = 0,
    onSelectTab,
    className,
    tabClassName,
    // activeTabClassName,
    disabled,
    variant = "top",
    containerOnly,
    // children,
    localizer: Localizer,
    ...props
}, ref) => (
    <AnimateSharedLayout>
        <As className={classNames("top-tab-nav", variant && `is-${variant}-nav`, containerOnly && "is-container-only", className)} {...props} ref={ref}>
            {tabs.map(tab => (
                <button key={`toptabnav-${tab.id}`} className={classNames("tab", tabClassName, tab.className, {
                    "is-active": selectedTab === tab.id,
                    "is-disabled": disabled || tab.disabled
                })} onClick={() => (!disabled && !tab.disabled) && onSelectTab && onSelectTab(tab)}>
                    <span>{(tab.localized && Localizer) ? <Localizer tag={tab.label} /> : tab.label}</span>
                    {tab.icon && (
                        <Icon icon={tab.icon.name || tab.icon} variant={tab.icon.variant} />
                    )}

                    {selectedTab === tab.id && (
                        <motion.div className="indicator" layoutId="tabnav-indicator" transition={{ duration: .3 }} />
                    )}
                </button>
            ))}
        </As>
    </AnimateSharedLayout>
);

export default React.forwardRef(Component);
