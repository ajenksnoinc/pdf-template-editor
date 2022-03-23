import React from "react";

import classNames from "~/utils/classnames";

const createBody = ({
    header,
    form: Form,
    title = "Form",
    submit = "Submit",
    cancel = "Cancel",
    titleColor = "bg-dark",
    data = null,
    metadata = null,
    error = null,
    footer = null
}) => function FormModalBody({
    onCancel,
    onConfirm
}) {
    let Footer = Form.Footer && Form.Footer(data);

    return (
        <React.Fragment>
            {(title || header) && (
                <div className={classNames("modal-header", titleColor)}>
                    {title && (<h5 className="modal-title">{title}</h5>)}
                    {header}
                </div>
            )}
            <div className="modal-body">
                <Form onSubmit={onConfirm} data={data} error={error} metadata={metadata}>
                    <div className="form-modal-footer">
                        {footer}
                        {Footer && (
                            <Footer onClose={data => onConfirm(data)} data={data} />
                        )}
                        {submit && (
                            <button type="submit" className="btn btn-primary">{submit}</button>
                        )}
                        {cancel && (
                            <button type="button" onClick={() => onCancel()} className="btn btn-text">{cancel}</button>
                        )}
                    </div>
                </Form>
            </div>
        </React.Fragment>
    );
};

export default createBody;
