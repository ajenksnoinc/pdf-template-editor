import React from "react";

import createEmitter from "~/utils/emitter";
import { nanoid } from "nanoid";

import FloatingArea from "./index";

type Popup = {
    body: any;
    floatParent?: Element;
};

type RegisteredPopup = Popup & {
    id: string;
    resolve(val: any): any;
    props: any;
};

type Events = {
    "show": [popup: RegisteredPopup],
    "hide": [popup: RegisteredPopup],
};

const events = createEmitter<Events>();
const popups: RegisteredPopup[] = [];

export const showPopup = ({ body, floatParent = document.body, ...props }: Popup) => {
    let id = nanoid(10);

    return new Promise(resolve => {
        let obj = {
            id, body,
            resolve,
            props: {
                floatParent, ...props
            }
        };

        popups.push(obj);
        events.emit("show", obj);
    });
};

export const hidePopup = (id, data) => {
    let i = popups.findIndex(x => x.id === id);

    if(~i) {
        let popup = popups[i];
        popup.resolve(data);
        popups.splice(i, 1);

        events.emit("hide", popup);
    }
};

export class Provider extends React.PureComponent {
    componentDidMount() {
        events.on("show", this.onChange);
        events.on("hide", this.onChange);
    }

    componentWillUnmount() {
        events.off("show", this.onChange);
        events.off("hide", this.onChange);
    }

    onChange = () => this.forceUpdate();

    render() {
        return popups.map(({ id, body: Body, props }) => (
            <FloatingArea {...props} key={`farea-${id}`}>
                <Body popupId={id} onClose={data => hidePopup(id, data)} />
            </FloatingArea>
        ));
    }
}

export default {
    showPopup, hidePopup, Provider
};
