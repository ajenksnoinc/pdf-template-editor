import ReactDOM from "react-dom";

export type Props = {
    children: any,
    id?: string;
    parent?: Element
}

const DEFAULT_ROOT = document.querySelector("#root") as Element;

function Portal({
    children,
    id,
    parent = DEFAULT_ROOT
}: Props) {
    return ReactDOM.createPortal(children, parent, id);
}

export default Portal;
