import { render, RenderResult } from "@testing-library/react";
import { ElementType } from "react";

import { setupServer } from "msw/node";

export * from "@testing-library/react";

type WithImportCache<T> = {
    module?: T,
    value: any,
    mounted: RenderResult | null
};

type WrappedImport<T extends {} = {}> = T & {
    render(props?: any): RenderResult;
    unmount(): void;
    getComponent(): ElementType;
};

export const translationKey = "mocha.test";
export const translationString = "Mocha Test";

export const getDOMNode = (component: RenderResult) => {
    return component.container.children[0];
};

export const getDOMNodes = (component: RenderResult) => {
    return [...component.container.children];
};

export const expectComponentClass = (
    component: RenderResult,
    className: string
) => {
    expect([...getDOMNode(component).classList]).toContain(className);
};

export const expectComponentTagName = (
    component: RenderResult,
    tagName: string
) => {
    expect(getDOMNode(component)?.tagName?.toLowerCase()).toBe(tagName.toLowerCase());
};

export const expectAsPropertySupport = (
    type: WrappedImport | any,
    prop = "as"
) => {
    it(`supports "${prop}" property`, () => {
        let Component: ElementType;

        if(type.unmount) {
            let component = type.render({ as: "div" });
            expectComponentTagName(component, "div");
            type.unmount();

            component = type.render({ as: "main" });
            expectComponentTagName(component, "main");
            type.unmount();
        } else {
            Component = type as ElementType;

            let component = render(<Component as="div" />);
            expectComponentTagName(component, "div");
            component.unmount();

            component = render(<Component as="main" />);
            expectComponentTagName(component, "main");
            component.unmount();
        }
    });
};

export function expectVariantSupport<T extends string>(
    type: WrappedImport | any,
    variants: T[],
    validator: (element: RenderResult, variant: T) => boolean,
    propName = "variant"
) {
    describe("supports variants", () => {
        if(type.unmount) {
            for(let variant of variants) {
                it(variant, () => {
                    let props = { [propName]: variant };
                    let component = type.render(props);
                    expect(validator(component, variant)).toBe(true);
                });
            }
        } else {
            let Component = type as ElementType;
            let elem: RenderResult | null;

            afterEach(() => {
                if(elem) {
                    elem.unmount();
                    elem = null;
                }
            });

            for(let variant of variants) {
                it(variant, () => {
                    let props = { [propName]: variant };
                    elem = render(<Component {...props} />);
                    expect(validator(elem, variant)).toBe(true);
                });
            }
        }
    });
}

export function expectLocalizationSupport(
    component: WrappedImport,
    translationProp: string,
    props: any,
    checker: (component: RenderResult) => string | null
) {
    it("supports localization", () => {
        let elem = component.render({
            ...props,
            [translationProp]: translationKey
        });

        expect(checker(elem)).toBe(translationString);
    });
}

export function withImport<T extends {}>(provider: () => Promise<T>, key = "default"): WrappedImport<T> {
    let cache: WithImportCache<T> = {
        value: null,
        mounted: null
    };

    const wrapper = {
        ...cache.module,

        render(props?: any) {
            let Component = cache.value as unknown as ElementType;

            if(cache.mounted) {
                cache.mounted.rerender(<Component {...props} />);
            } else {
                cache.mounted = render(<Component {...props} />);
            }

            return cache.mounted;
        },

        unmount() {
            if(cache.mounted) {
                cache.mounted.unmount();
                cache.mounted = null;
            }
        },

        getComponent() {
            return cache.value;
        }
    } as unknown as WrappedImport<T>;

    beforeAll((done) => {
        provider().then((val) => {
            cache.module = val;
            cache.value = val[key];
            done();
        }).catch(done);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    return wrapper;
}

export const withMockedServer = (...config) => {
    const server = setupServer(...config);

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    return server;
};

const customRenderer = stuff => {
    return render(stuff);
};

export { customRenderer as render };

export default {
    translationKey,
    translationString,

    getDOMNode,
    getDOMNodes,

    expectComponentClass,
    expectComponentTagName,
    expectAsPropertySupport,
    expectLocalizationSupport,
    expectVariantSupport,

    withImport,
    withMockedServer,

    render: customRenderer
};
