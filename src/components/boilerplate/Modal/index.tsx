import React from "react";

import Modal from "react-modal";

import classNames from "~/utils/classnames";

import "./style.scss";

const parentSelector = () => document.querySelector("#root");

const styles = {
    overlay: {
        background: "rgba(0, 0, 0, 0.4)",
        zIndex: 1000
    },
    content: {
        background: "transparent",
        pointerEvents: "none",
        border: "none",
        borderRadius: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        margin: 0
    }
};

const coalesceText = (text, defaultValue) => {
    if(text === false) {
        return null;
    }

    if(text === null || text === undefined) {
        return defaultValue;
    }

    if(typeof text === "string") {
        return text.length ? text : null;
    }

    return defaultValue;
};

export type Props = {
    confirmText?: string;
    cancelText?: string;
    open?: boolean;
    onCancel?: any;
    className?: string;
    disableClick?: boolean;
    modalProps?: any;
};

/**
 * modal-open is a Bootstrap CSS class to automatically stop body scrolling
 */
export default class ConfirmationModal extends React.PureComponent<Props> {
    state = {
        overridingProps: false,
        confirmText: coalesceText(this.props.confirmText, "Confirm"),
        cancelText: coalesceText(this.props.cancelText, "Cancel")
    };

    static getDerivedStateFromProps(props, state) {
        if(props.confirmText != state.confirmText && !state.overridingProps) {
            return {
                confirmText: coalesceText(props.confirmText, "Confirm")
            };
        } else if(props.cancelText != state.cancelText && !state.overridingProps) {
            return {
                cancelText: coalesceText(props.cancelText, "Cancel")
            };
        }

        return null;
    }

    setConfirmText = confirmText => new Promise(res =>
        // @ts-ignore
        this.setState({ confirmText, overridingProps: true }, res)
    );

    setCancelText = cancelText => new Promise(res =>
        // @ts-ignore
        this.setState({ cancelText, overridingProps: true }, res)
    );

    render() {
        let {
            open: isOpen,
            onCancel,
            className,
            children,
            disableClick,
            modalProps = {}
        } = this.props;

        let clickHandler = disableClick ? (() => null) : (() => onCancel());

        const props = {
            appElement: parentSelector(),
            styles, isOpen,
            shouldCloseOnOverlayClick: true,
            onRequestClose: clickHandler,
            className: classNames("modal", isOpen && "is-active"),
            overlayClassName: "modal-overlay",
            bodyOpenClassName: "is-modal-open",
            overlayElement: (props, children) => children,
            ...modalProps
        };

        return (
            <Modal {...props}>
                <div className="modal-background" onClick={clickHandler} />
                <div className={classNames("modal-content", className)}>
                    {children}
                </div>
            </Modal>
        );
    }
}
