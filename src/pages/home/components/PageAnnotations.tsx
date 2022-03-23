import { observer } from "mobx-react-lite";
import CloseDetector from "~/components/interactivity/CloseDetector";
import { state } from "../state";
import type { EditorElement } from "../types";
import PageElement from "./PageElement";

export type Props = {
    pageId: number;
    activeElement: string;
    onClickElement: (elem: EditorElement) => any;
    onMutateElement: (elem: EditorElement) => any;
    onEditDetails: (elem: EditorElement) => any;
    onTryDeleteElement: (elem: EditorElement) => any;
    onDeselectElement: () => any;
};

function PageAnnotations({
    pageId,
    activeElement,
    onClickElement,
    onMutateElement,
    onEditDetails,
    onTryDeleteElement,
    onDeselectElement
}: Props) {
    const elements = state.elements[pageId] || [];

    return (
        <div className="element-container">
            {elements.map((elem) => {
                const isActive = elem.id === activeElement;

                return (
                    <CloseDetector disabled={!isActive} onClose={onDeselectElement} key={`elem-${elem.id}`}>
                        {ref => (
                            <PageElement innerRef={ref} {...elem}
                                active={isActive}
                                onClick={onClickElement}
                                onMutateElement={onMutateElement}
                                onEditDetails={onEditDetails}
                                onTryDeleteElement={onTryDeleteElement} />
                        )}
                    </CloseDetector>
                );
            })}
        </div>
    );
}

export default observer(PageAnnotations);
