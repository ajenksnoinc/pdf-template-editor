import { useEffect, ElementType } from "react";

export type Props = {
    id: string;
    title?: string;
};

export function usePageMetadata({
    id,
    title = "no.inc"
}: Props, dependencies = []) {
    useEffect(() => {
        document.body.setAttribute("page", id);
        document.title = title;
    }, [ id, title, ...dependencies ]); // eslint-disable-line react-hooks/exhaustive-deps
}

export function withPageMetadata<T extends ElementType>(Component: T, metadata: Props): T {
    function PageMetadataComponent(props) {
        usePageMetadata(metadata);

        return (
            <Component {...props} />
        );
    }

    return PageMetadataComponent as unknown as T;
}
