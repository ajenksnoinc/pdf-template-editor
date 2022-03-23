import { useCallback, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import FloatingActionButton from "~/components/boilerplate/Button/flavors/FloatingActionButton";

import classNames from "~/utils/classnames";

export type Props = {
    onAddElement: (x: number, y: number) => any;
};

function ElementDropper({
    onAddElement
}: Props) {
    const buttonRef = useRef<HTMLButtonElement>();
    // "origin" is from top right to account for framer motion trickery
    const [ originCoords, setOriginCoords ] = useState<[number, number]>([0,0]);
    const [ dragging, setDragging ] = useState(false);

    const onDragStart = useCallback((event) => {
        if(buttonRef.current) {
            const button = buttonRef.current;

            let rect = button.getBoundingClientRect();
            setOriginCoords([
                Math.round(rect.right - event.clientX),
                Math.round(event.clientY - rect.top)
            ]);

            setDragging(true);
        }
    }, [ originCoords, setDragging, buttonRef, setOriginCoords ]);

    const onDragEnd = useCallback((event) => {
        const mouseX = event.pageX;
        const mouseY = event.pageY;

        setDragging(false);

        onAddElement(
            mouseX - 250 + originCoords[0],
            mouseY + originCoords[1]
        );
    }, [ originCoords, setDragging, onAddElement ]);

    return (
        <FloatingActionButton size="lg" title="Add Element"
            ref={buttonRef}
            icon={dragging ? "flip_to_front" : "add"}
            className={classNames("floating-action-btn", dragging && "is-dragging")}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            iconProps={{ ...iconMotionProps, iconKey: dragging ? "add-btn-dragging" : "add-btn-normal" }}
            {...buttonMotionProps} />
    );
}

function ElementDropperIcon({ iconKey, ...props }: any) {
    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <motion.i key={iconKey} {...props} />
        </AnimatePresence>
    );
}

const buttonMotionProps = {
    as: motion.button,
    drag: true,
    dragSnapToOrigin: true,
    dragMomentum: false,
    whileDrag: {
        width: 250,
        height: 36
    }
};

const iconMotionProps = {
    as: ElementDropperIcon,
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 30, opacity: 0 },
    transition: { duration: .2 }
};

export default ElementDropper;
