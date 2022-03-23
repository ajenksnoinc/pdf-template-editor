export interface Element {
    id: string;
    label: string;

    width: number;
    height: number;

    x: number;
    y: number;
}

export interface EditorElement extends Element {
    dragging?: boolean;
}
