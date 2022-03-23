import { useEffect } from "react";
import { withPageMetadata } from "~/hooks/usePageMetadata";

import Navbar from "~/components/boilerplate/Navbar/flavors/FlexNav";
import Modal from "~/components/boilerplate/Modal/ModalProvider";

import ReactForm from "@paros-ui/react-forms";

import EditorActions from "./components/EditorActions";
import DocumentEditor from "./components/DocumentEditor";
import ElementDropper from "./components/ElementDropper";
import FileDropper from "./components/FileDropper";

import { toast } from "react-toastify";

import { action, observe } from "mobx";
import { observer } from "mobx-react-lite";
import { state } from "./state";

import type { EditorElement } from "./types";

import "./style.scss";

// For this page, I opted to use mobx to handle state instead of a class-based component so that
// the constant re-rendering of PageElements from keyboard movements wouldn't cause the whole
// list to re-render, preserving performance no matter how many elements are in the document
function HomePage() {
    useEffect(() => {
        return observe(state, "editing", (change) => {
            // This makes things feel better and avoids elements getting shoved around while
            // collapsing or expanding pages, or loading a document
            document.documentElement.style["overflowY"] = change.newValue ? "scroll" : "";
        });
    }, []);

    return (
        <section className="page page-home">
            <Navbar variant="sticky" className="is-raised">
                <span className="title">PDF Template Editor</span>

                <EditorActions onCloseDocument={onCloseDocument} onSaveTemplate={onSaveTemplate} />
            </Navbar>

            {state.editing ? (
                <DocumentEditor
                    onClickElement={onClickElement}
                    onDeselectElement={(pageId) => onClickElement(pageId)}
                    onMutateElement={onMutateElement}
                    onEditElementDetails={onEditElementDetails}
                    onTryDeleteElement={onDeleteElement} />
            ) : (
                <FileDropper onDropFile={onDropFile} />
            )}

            {state.editing && (
                <ElementDropper onAddElement={onAddElement} />
            )}
        </section>
    );
}

const onDropFile = ([ validFile ], [ invalidFile ]) => {
    if(invalidFile) {
        return toast.warn("Only PDF files can be edited");
    }

    let reader = new FileReader();

    reader.onload = action(e => {
        state.editing = true;
        state.document = e.target?.result;
    });

    reader.readAsDataURL(validFile);
};

const onCloseDocument = action(() => {
    state.reset();
});

const onAddElement = (x: number, y: number) => {
    // Translate page coordinates to viewport coordinates and find a page wrapper
    let viewX = x - window.scrollX;
    let viewY = y - window.scrollY;

    // console.log(`View: (${viewX}, ${viewY})`);

    let target = document.elementFromPoint(viewX, viewY)?.closest(".page-wrapper");

    if(!target) {
        return;
    }

    // Get the page ID and position of the page wrapper (fits exactly to the page itself)
    let rect = target.getBoundingClientRect();
    let pageId = Number(target.getAttribute("data-page-id"));

    // console.log(`RRct: (${rect.left}, ${rect.top})`);
    // console.log(`Rect: (${rect.left + window.scrollX}, ${rect.top + window.scrollY})`);

    let pageX = x - (rect.left + window.scrollX);
    let pageY = y - (rect.top + window.scrollY);

    // console.log(`RPge: (${x - rect.left}, ${y - rect.top})`);
    // console.log(`Page: (${pageX}, ${pageY})`);

    // console.log(rect);

    // console.log({
    //     pageId,
    //     rect: [rect.left, rect.top],
    //     page: [x, y],
    //     docu: [pageX, pageY],
    //     view: [viewX, viewY]
    // });

    // console.log(`Adding element to page ${pageId}!`);
    return onAddElementToPage(pageId, pageX - 4, pageY - 40);
};

const onAddElementToPage = action((pageId: number, x: number, y: number) => {
    const nextElementId = state.nextElementId;

    state.addElement(pageId, {
        label: `Element${nextElementId}`,
        width: 250,
        height: 36,
        x, y
    });
});

const onDeleteElement = action((pageId: number, elem: EditorElement) => {
    state.removeElement(pageId, elem);
});

const onClickElement = action((pageId: number, elem?: EditorElement) => {
    state.activeElement = elem ? elem.id : "";
});

const onEditElementDetails = action(async(pageId: number, elem: EditorElement) => {
    console.log(pageId, elem);

    const { Form, Fields, getState } = new ReactForm({
        name: "element-details-form",
        initialValues: { ...elem }
    });

    // Apparently I need to fix the typings of my form library, sorry for the ts-ignores
    await Modal.showConfirmationModal({
        body: ({ onSubmit }) => (
            // @ts-ignore
            <Form onSubmit={onSubmit}>
                {/* @ts-ignore */}
                <Fields.label template="text" label="Label" />
                {/* @ts-ignore */}
                <Fields.x template="text" type="number" label="X Position" />
                {/* @ts-ignore */}
                <Fields.y template="text" type="number" label="Y Position" />
                {/* @ts-ignore */}
                <Fields.width template="text" type="number" label="Width" />
                {/* @ts-ignore */}
                <Fields.height template="text" type="number" label="Height" />
            </Form>
        ),
        yes: "Save",
        no: "Cancel"
    });

    const values = getState().values as EditorElement;
    state.updateElement(pageId, values);
});

const onMutateElement = action((pageId: number, element: EditorElement) => {
    state.updateElement(pageId, element);
});

const onSaveTemplate = async() => {
    const documentWidth = 8.5; // 8.5"
    const documentHeight = 11; // 11"
    const ppi = 72;

    const widthPixels = documentWidth * ppi;
    const heightPixels = documentHeight * ppi;

    const pageRect = document.querySelector("[data-page-number]")?.getBoundingClientRect() as DOMRect;
    const widthRatio = widthPixels / pageRect.width;
    const heightRatio = heightPixels / pageRect.height;

    let converted = Object.keys(state.elements).map(pageId => {
        let elements = state.elements[pageId].map((elem: EditorElement) => ({
            id: elem.label,
            x: elem.x * widthRatio,
            y: elem.y * heightRatio,
            width: elem.width * widthRatio,
            height: elem.height * heightRatio
        }));

        return {
            page: pageId,
            elements
        };
    });

    await Modal.showConfirmationModal({
        body: () => (
            <textarea rows={6} style={{ font: "monospace", width: "100%" }} value={JSON.stringify(converted, null, 4)} />
        ),
        no: false,
        yes: "Close"
    });
};

let Component = observer(HomePage);

Component = withPageMetadata(Component, {
    id: "home",
    title: "Home"
});

export default Component as typeof HomePage;
