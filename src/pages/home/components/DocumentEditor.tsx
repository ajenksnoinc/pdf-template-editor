import { useCallback, useEffect, useRef, useState } from "react";
import useWindowSize from "~/hooks/useWindowSize";
import { observer } from "mobx-react-lite";

// import CloseDetector from "~/components/interactivity/CloseDetector";
import { Document } from "react-pdf/dist/esm/entry.webpack";
import Content from "~/components/boilerplate/Content";
import DocumentPage from "./DocumentPage";
// import PageElement from "./PageElement";

import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import type { EditorElement } from "../types";
import { state } from "../state";

export interface Props {
    onClickElement: (pageId: number, elem?: EditorElement) => any;
    onEditElementDetails: (pageId: number, elem: EditorElement) => any;
    onDeselectElement: (pageId: number) => any;
    onTryDeleteElement: (pageId: number, elem: EditorElement) => any;
    onMutateElement: (pageId: number, elem: EditorElement) => any;
}

function DocumentEditor({
    onClickElement,
    onDeselectElement,
    onEditElementDetails,
    onTryDeleteElement,
    onMutateElement
}: Props) {
    const [ pageIds, setPageIds ] = useState<number[]>([]);
    const { width } = useWindowSize();

    const documentRef = useRef<HTMLDivElement>();

    const onLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
        console.log(pdf);
        // Get an array of sequential numbers from 1 to n
        const pageIds = Array(pdf.numPages).fill(0).map((_,i) => i + 1);
        setPageIds(pageIds);
    }, [ setPageIds ]);

    // Left and right padding, because you have to provide a pixel dimensions for the pages
    const pageWidth = width - 64;

    // react-pdf doesn't pass any props except className to the document container, so we need to manually edit the style after mount
    useEffect(() => {
        if(documentRef.current) {
            documentRef.current.style.width = `${pageWidth}px`;
        }
    }, [ documentRef, pageWidth ]);

    return (
        <Content className="document-container">
            <Document className="document" file={state.document} onLoadSuccess={onLoadSuccess} inputRef={documentRef}>
                {pageIds.map(id => (
                    <DocumentPage key={`page-${id}`} pageId={id}
                        width={pageWidth}
                        activeElement={state.activeElement}
                        onClickElement={elem => onClickElement(id, elem)}
                        onMutateElement={onMutateElement}
                        onEditDetails={elem => onEditElementDetails(id, elem)}
                        onDeselectElement={() => onDeselectElement(id)}
                        onTryDeleteElement={elem => onTryDeleteElement(id, elem)} />
                ))}
            </Document>
        </Content>
    );
}


{/* <div className="element-container">
{elements.map((elem, i) => {
    const isActive = elem.id === activeElement;

    return (
        <CloseDetector disabled={!isActive} onClose={onDeselectElement} key={`elem-${elem.id}`}>
            {ref => (
                <PageElement innerRef={ref} {...elem}
                    active={isActive}
                    onClick={onClickElement}
                    onMutateElement={(element) => onMutateElement(element, i)}
                    onEditDetails={element => onEditElementDetails(element)} />
            )}
        </CloseDetector>
    );
})}
</div> */}


export default observer(DocumentEditor);
