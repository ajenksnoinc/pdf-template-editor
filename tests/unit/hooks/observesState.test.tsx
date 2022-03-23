import utils, { act } from "tests/utils";

import { observable } from "mobx";

import observesState from "~/hooks/observesState";

const state = observable({
    test: "1"
});

type Props = {
    onChange?: (value) => void;
};

const Component: React.FunctionComponent<Props> = ({ onChange }) => {
    let val = observesState(state, "test");

    if(onChange) {
        onChange(val);
    }

    return val as unknown as null;
};

describe("Hook - describePage", () => {
    let component;

    afterEach(() => {
        if(component) {
            component.unmount();
            component = null;
            state.test = "1";
        }
    });

    it("properly fetches state", () => {
        component = utils.render(<Component />);
        expect(component.getByText("1")).toBeDefined();
    });

    it("reacts to changes", (done) => {
        let value = "1";

        const onChange = (val) => {
            expect(val).toBe(value);

            if(value === "2") {
                done();
            }
        };

        component = utils.render(<Component onChange={onChange} />);
        expect(component.getByText(value)).toBeDefined();

        act(() => {
            value = "2";
            state.test = "2";
        });
    });
});
