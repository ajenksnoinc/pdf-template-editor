import React, { useMemo, useState } from "react";

import { Page } from "react-pdf/dist/esm/entry.webpack";
import { AnimatePresence, motion } from "framer-motion";

import CloseDetector from "~/components/interactivity/CloseDetector";
import Button from "~/components/boilerplate/Button";
import Col from "~/components/boilerplate/Col";

import PageAnnotations from "./PageAnnotations";

import type { EditorElement } from "../types";
import { observer } from "mobx-react-lite";

export type Props = {
    pageId: number;
    width: number;
    activeElement: string;
    onClickElement: (elem: EditorElement) => any;
    onMutateElement: (pageId: number, elem: EditorElement) => any;
    onEditDetails: (elem: EditorElement) => any;
    onTryDeleteElement: (elem: EditorElement) => any;
    onDeselectElement: () => any;
};

function DocumentPage({
    pageId,
    width,
    activeElement,
    onClickElement,
    onMutateElement,
    onEditDetails,
    onDeselectElement,
    onTryDeleteElement
}: Props) {
    let [ expanded, setExpanded ] = useState(true);
    let [ showOptions, setShowOptions ] = useState(false);

    // For Framer-Motion to work right in this collapsible page, the height should be
    // controlled. This doesn't have to be precise, just has to give it a sense of where
    // it should animate to. Our estimate is based on the standard 8.5" x 11" ratio
    const probablePageHeight = (11/8.5) * width;

    let pageAnimationProps = useMemo(() => ({
        initial: "collapsed",
        animate: "open",
        exit: "collapsed",
        variants: {
            open: { opacity: 1, height: probablePageHeight },
            collapsed: { opacity: 0, height: 0 }
        }
    }), [ probablePageHeight ]);

    return (
        <React.Fragment>
            <Col span="12" className="page-detail-bar">
                <span>Page {pageId}</span>

                <div className="is-flex">
                    <CloseDetector disabled={!showOptions} onClose={() => setShowOptions(false)}>
                        {ref => (
                            <Button size="md" variant="icon" icon="more_vert" className="has-mr-0"
                                ref={ref} onClick={() => setExpanded(!expanded)} />
                        )}
                    </CloseDetector>

                    <Button size="md" variant="icon"
                        icon={expanded ? "expand_less" : "expand_more"}
                        onClick={() => setExpanded(!expanded)} />
                </div>
            </Col>

            <AnimatePresence>
                {expanded && (
                    <motion.div key={`page-wrapper-${pageId}`} className="page-wrapper" data-page-id={pageId} {...pageAnimationProps}>
                        <Page className="page" pageNumber={pageId} width={width}>
                            <PageAnnotations pageId={pageId}
                                activeElement={activeElement}
                                onClickElement={onClickElement}
                                onMutateElement={elem => onMutateElement(pageId, elem)}
                                onEditDetails={onEditDetails}
                                onDeselectElement={onDeselectElement}
                                onTryDeleteElement={onTryDeleteElement} />
                        </Page>
                    </motion.div>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
}

export default observer(DocumentPage);
