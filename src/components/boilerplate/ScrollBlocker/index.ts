import React from "react";
import withId from "~/hooks/withId";

import ScrollBlocker from "~/services/ScrollBlocker";

export default ({ blocked = true } = {}) => {
    let id = withId();

    React.useEffect(() => {
        if(blocked) {
            ScrollBlocker.enableBlock(id);
        } else {
            ScrollBlocker.disableBlock(id);
        }

        return () => {
            ScrollBlocker.disableBlock(id);
        };
    }, [ id, blocked ]);

    return null;
};
