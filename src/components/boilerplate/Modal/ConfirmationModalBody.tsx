import React from "react";
import classNames from "~/utils/classnames";

import Card from "../Card";

const createBody = ({
    header,
    body: Body,
    title = "Confirm",
    yes = "Yes",
    no = "No",
    titleColor = "bg-dark",
    footer = null
}) => function ConfirmationModalBody({
    onCancel,
    onConfirm
}) {
    return (
        <Card>
            {(title || header) && (
                <div className={classNames("modal-header", titleColor)}>
                    {title && (<h5 className="modal-title">{title}</h5>)}
                    {header}
                </div>
            )}
            <div className="modal-body">
                <div className="row px-3 text-breakable">{React.isValidElement(Body) ? Body : <Body onSubmit={onConfirm} />}</div>

                <div className="form-modal-footer">
                    {footer}
                    {yes && (
                        <button type="button" onClick={() => onConfirm()} className="btn btn-primary">{yes}</button>
                    )}
                    {no && (
                        <button type="button" onClick={() => onCancel()} className="btn btn-text">{no}</button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default createBody;
