import React from "react";
// import classNames from "~/utils/classnames";

// import Tooltip from "~/components/Tooltip";

export default ({
    required,
    label,
    tooltip, //eslint-disable-line
    tooltipProps, //eslint-disable-line
    helperClassName, //eslint-disable-line
    ...props
}) => {
    let helper;

    // if(tooltip) {
    //     let { icon = "help", ...x } = tooltipProps || {};

    //     helper = (
    //         <Tooltip {...x} title={tooltip}>
    //             <i className={classNames("form-helper material-icons", helperClassName)}>{icon}</i>
    //         </Tooltip>
    //     );
    // }

    if(!required) {
        return (
            <label {...props}>{label}{helper}</label>
        );
    }

    return (
        <label {...props}>
            {label}<span className="required-star" />{helper}
        </label>
    );
};
