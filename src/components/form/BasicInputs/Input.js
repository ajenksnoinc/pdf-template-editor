import React from "react";
import classNames from "~/utils/classnames";
import { addLabel, addFormGroup, addAdornment } from "./wrapInput";

// import Tooltip from "~/components/Tooltip";

const Input = React.forwardRef(({
    groupClassName,
    error,
    className = "form-control",
    type,
    label,
    labelClassName,
    noFormGroup,
    beforeAdornment,
    afterAdornment,
    id,
    value,
    required,
    helpText,
    disabledTooltip, //eslint-disable-line
    disabled,
    ...props
}, ref) => {
    if(!value)
        value = "";

    let input = (
        <input type={type} id={id} disabled={disabled} className={classNames(className, error && "is-invalid")} ref={ref} value={value} required={required} {...props} />
    );

    if(type === "hidden")
        return input;

    // if(disabledTooltip && disabled) {
    //     input = (
    //         <Tooltip title={disabledTooltip}>{input}</Tooltip>
    //     );
    // }

    if(beforeAdornment || afterAdornment) {
        input = addAdornment({ input, beforeAdornment, afterAdornment });
    }

    if(label) {
        input = addLabel({ input, label, id, labelClassName, required });
    }

    if(!noFormGroup) {
        input = addFormGroup({ input, groupClassName, error, helpText });
    }

    return input;
});

export default Input;
