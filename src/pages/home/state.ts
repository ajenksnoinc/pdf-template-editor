import { action, observable } from "mobx";
import { useObserver } from "mobx-react-lite";

import type { EditorElement } from "./types";

type PageElementMap = { [pageId: number]: EditorElement[] };

export interface State {
    editing: boolean;
    document: any;
    elements: PageElementMap;
    nextElementId: number;
    addingElement: boolean;
    activeElement: string;

    reset(): void;

    addElement(pageId: number, element: Partial<EditorElement>): void;
    updateElement(pageId: number, element: EditorElement): void;
    removeElement(pageId: number, element: EditorElement): boolean;
}

export const state = observable<State>({
    editing: false,
    document: null,
    elements: {} as PageElementMap,
    nextElementId: 0,
    addingElement: false,
    activeElement: "",

    reset() {
        this.editing = false;
        this.document = null;
        this.elements = {};
        this.nextElementId = 0;
        this.addingElement = false;
        this.activeElement = "";
    },

    addElement(pageId, element) {
        const nextElementId = this.nextElementId;

        if(!this.elements[pageId]) {
            this.elements[pageId] = [] as EditorElement[];
        }

        this.elements[pageId].push({
            ...element,
            id: `elem_${nextElementId}`
        } as EditorElement);

        this.nextElementId++;
    },

    updateElement(pageId, element) {
        if(!this.elements[pageId]) {
            this.elements[pageId] = [] as EditorElement[];
        }

        let i = this.elements[pageId].findIndex(x => x.id === element.id);

        if(i !== -1) {
            this.elements[pageId][i] = element;
        }
    },

    removeElement(pageId, element) {
        if(!this.elements[pageId]) {
            return false;
        }

        let i = this.elements[pageId].findIndex(x => x.id === element.id);

        if(i === -1) {
            return false;
        }

        this.elements[pageId].splice(i, 1);

        return true;
    }
});

type SetStateLambda = (state: State) => any;

export const setState = action((lambda: SetStateLambda) => lambda(state));

export function useEditingStatus() {
    return useObserver(() => state.editing);
}

export function useElementList() {
    return useObserver(() => state.elements);
}

export function useElementsForPage(pageId: number) {
    return useObserver(() => state.elements[pageId] || []);
}
