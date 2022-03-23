import React from "react";
import EventPipeline from "~/utils/EventPipeline";
import Modal from "./index";
import { nanoid } from "nanoid";

import ConfirmationModalBody from "./ConfirmationModalBody";
import FormModalBody from "./FormModalBody";

const modals = {};

EventPipeline.on("modal:open", props => {
    let id = nanoid();
    modals[id] = props;
    EventPipeline.emit("modal:change", "open", id);
});

type ShowModalProps = {
    header?: any;
    body?: any;
    title?: any;
    yes?: any;
    no?: any;
    titleColor?: any;
    footer?: any;
    [x: string | number | symbol]: unknown;
};

export const hideModal = id => {
    if(modals[id]) {
        if(modals[id].onClose) {
            modals[id].onClose();
        }

        delete modals[id];
        EventPipeline.emit("modal:change", "close", id);
    }
};

export const showModal = (props: ShowModalProps) => new Promise(resolve => {
    EventPipeline.emit("modal:open", {
        ...props,
        closeHandler: ({ modalId, response }) => {
            hideModal(modalId);
            return resolve(response);
        }
    });
});

export const showConfirmationModal = ({
    header,
    body,
    title,
    yes,
    no,
    titleColor,
    footer,
    ...props
}: ShowModalProps) => showModal({
    ...props,
    children: ConfirmationModalBody({ header, body, title, yes, no, titleColor, footer })
});

export const showFormModal = ({
    header,
    form,
    data,
    metadata,
    title,
    submit,
    cancel,
    titleColor,
    footer,
    error,
    ...props
}) => showModal({
    ...props,
    children: FormModalBody({ header, form, data, error, title, submit, cancel, titleColor, footer, metadata })
});

export default class ModalProvider extends React.PureComponent {
    static showModal = showModal;
    static hideModal = hideModal;
    static ConfirmationModal = ConfirmationModalBody;
    static showConfirmationModal = showConfirmationModal;
    static showFormModal = showFormModal;

    componentDidMount = () => EventPipeline.on("modal:change", () => this.forceUpdate());
    componentWillUnmount = () => EventPipeline.removeAllListeners("modal:change");

    render() {
        return Object.keys(modals).map(modalId => {
            let { component: Component = Modal, children: Children, ...props } = modals[modalId];

            const onCancel = (response = false) => modals[modalId].closeHandler({ modalId, response });
            const onConfirm = (response = true) => modals[modalId].closeHandler({ modalId, response });

            return (
                <Component {...props} key={`modal-${modalId}`} open onCancel={onCancel} onConfirm={onConfirm}>
                    {typeof Children === "function" ? <Children onCancel={onCancel} onConfirm={onConfirm} /> : Children}
                </Component>
            );
        });
    }
}
