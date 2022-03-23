import { useDropzone } from "react-dropzone";

import Content from "~/components/boilerplate/Content";
import Icon from "~/components/boilerplate/Icon";

import classNames from "~/utils/classnames";

export interface Props {
    onDropFile: any
}

function FileDropper({
    onDropFile
}: Props) {
    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        multiple: false,
        accept: ".pdf",
        onDrop: onDropFile
    });

    return (
        <Content className={classNames("file-dropper", isDragActive && "is-dragging")} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <div className="drop-container-content is-flex-column has-aligned-center">
                    <Icon icon="inbox" />
                    <p>Drop the PDF here</p>
                </div>
            ) : (
                <div className="drop-container-content is-flex-column has-aligned-center">
                    <Icon icon="note_add" variant="outline" />
                    <p>Drag a PDF here, or tap to choose one</p>
                </div>
            )}
        </Content>
    );
}

export default FileDropper;
