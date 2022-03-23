import React from "react";
import classNames from "~/utils/classnames";

import Label from "../Label";

export const addLabel = ({ input, label, id, labelClassName, required }) => (
    <>
        <Label htmlFor={id} className={classNames("d-block", labelClassName)} label={label} required={required} />
        {input}
    </>
);

export const addFormGroup = ({ input, groupClassName, error, helpText }) => (
    <div className={classNames("form-group", groupClassName)}>
        {input}
        <div className="invalid-feedback">{error}</div>
        {helpText && (
            <small>{helpText}</small>
        )}
    </div>
);

export const addAdornment = ({ input, beforeAdornment, afterAdornment }) => (
    <div className={classNames("input-group", {
        "has-adornment": beforeAdornment || afterAdornment,
        "has-adornment-before": beforeAdornment,
        "has-adornment-after": afterAdornment
    })}>
        {beforeAdornment && (
            <div className="input-group-prepend">{beforeAdornment}</div>
        )}
        {input}
        {afterAdornment && (
            <div className="input-group-append">{afterAdornment}</div>
        )}
    </div>
);
