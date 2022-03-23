import React from "react";
import Contexts from "~/utils/contexts";

import Skeleton, { Props as SkeletonProps } from "~/components/display/Skeleton";

export const LoadingContext = Contexts.createNestingContext({});

export const withLoaders = Component => props => (
    <LoadingContext.Consumer>
        {loaders => (
            <Component {...props} loaders={loaders} />
        )}
    </LoadingContext.Consumer>
);

export const useLoaders = () => React.useContext(LoadingContext);

export type LoadingKeyProps = {
    loadingKey?: string;
};

// This could technically be used to react to a single property of a context in general, but this is only supposed to be used for booleans
export const useLoadingKey = (props: LoadingKeyProps) => {
    let { loadingKey } = props;
    let [ show, setShow ] = React.useState(false);
    let ctx = useLoaders();

    React.useEffect(() => {
        if(loadingKey && ctx[loadingKey] !== show) {
            setShow(ctx[loadingKey]);
        }
    }, [ ctx[loadingKey as string] ]); // eslint-disable-line react-hooks/exhaustive-deps

    return show;
};

// Convenience component to avoid importing project-specific library everywhere. Easy to update from one place too
// Any library you pick must at least implement these peops for compatibility with prebuilt components
export const showLoader = (args: SkeletonProps = {}) => (
    <Skeleton {...args} />
);

export const Placeholder = (props: LoadingKeyProps & SkeletonProps) => {
    let show = useLoadingKey(props);

    if(show) {
        return showLoader(props);
    }

    return null;
};

export default {
    LoadingContext,
    withLoaders,
    useLoaders,
    useLoadingKey,
    showLoader,
    Loader: showLoader,
    Placeholder
};
