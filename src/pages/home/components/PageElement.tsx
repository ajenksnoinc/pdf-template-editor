// import { useCallback, useState } from "react";
import useArrowKeys from "~/hooks/useArrowKeys";

import { motion } from "framer-motion";
import type { EditorElement } from "../types";

import classNames from "~/utils/classnames";
import { Rnd } from "react-rnd";
import { useCallback } from "react";
import Icon from "~/components/boilerplate/Icon";

export interface Props extends EditorElement {
    innerRef: any,
    active: boolean;
    onClick: (elem: EditorElement) => any;
    onTryDeleteElement: (elem: EditorElement) => any;
    onMutateElement: (elem: EditorElement) => any;
    onEditDetails: (elem: EditorElement) => any;
}

function PageElement({
    innerRef,
    active,
    onClick,
    onTryDeleteElement,
    onMutateElement,
    onEditDetails,
    ...element
}: Props) {
    const { id, label, x, y, width, height } = element;
    const onClickHandler = useCallback(() => onClick(element), [ onClick ]);

    const onDragStop = useCallback((e,d) => onMutateElement({
        ...element,
        x: d.x, y: d.y
    }), [ element ]);

    const onResizeStop = useCallback((e, d, t, change, pos) => onMutateElement({
        ...element,
        width: width + change.width,
        height: height + change.height,
        ...pos
    }), [ element ]);

    const onTryEdit = useCallback(e => {
        e.preventDefault();
        onEditDetails(element);
    }, [ onEditDetails ]);

    const onTryDelete = useCallback(e => {
        e.preventDefault();
        onTryDeleteElement(element);
    }, [ onEditDetails ]);


    useArrowKeys({
        active,
        onNudge: (dx, dy, modifiers) => {
            let dX = 0, dY = 0;
            let dW = 0, dH = 0;

            if(!modifiers.shift) {
                dX = dx;
                dY = dy;
            } else {
                dW = dx;
                dH = dy;
            }

            onMutateElement({
                ...element,
                x: x + dX, y: y + dY,
                width: width + dW,
                height: height + dH
            });
        }
    });

    const props = {
        size: { width, height },
        position: { x, y },
        className: classNames("page-element", active && "is-active"),
        onClick: onClickHandler,
        onDragStop, onResizeStop
    };

    const animationProps = {
        className: "element-details",
        initial: { scale: 0 },
        animate: { scale: 1 },
        exit: { scale: 0 }
    };

    return (
        <Rnd {...props} ref={ref => innerRef.current = (ref?.resizableElement.current)} data-element-id={id}>
            <div className="element-body">
                {label}
                {active && (
                    <motion.div {...animationProps}>
                        <span>({x}, {y}) - {width}x{height}</span>
                        <span className="has-ml-3">
                            <a href="#/" onClick={onTryEdit}>
                                <Icon icon="edit" />
                            </a>
                            <a href="#/" onClick={onTryDelete}>
                                <Icon icon="delete" />
                            </a>
                        </span>
                    </motion.div>
                )}
            </div>
        </Rnd>
    );
}

export default PageElement;
