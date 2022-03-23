import { observer } from "mobx-react-lite";

import Button from "~/components/boilerplate/Button";
import { state } from "../state";

export interface Props {
    onCloseDocument?: React.MouseEventHandler<HTMLButtonElement>;
    onSaveTemplate?: React.MouseEventHandler<HTMLButtonElement>;
}

function EditorActions({
    onCloseDocument,
    onSaveTemplate
}: Props) {
    const isEditing = state.editing;
    const isAddingElement = state.addingElement;

    if(!isEditing) {
        return null;
    }

    return (
        <div className="is-flex-row is-aligned-center">
            <Button title="Save Template JSON" variant="icon-square" icon="save" size="md" className="has-m-0 has-mr-3 is-size-unset" onClick={onSaveTemplate} disabled={isAddingElement} />
            <Button title="Exit Document" variant="icon-square" icon="close" size="md" className="has-m-0 is-size-unset" onClick={onCloseDocument} disabled={isAddingElement} />
        </div>
    );
}

export default observer(EditorActions);
