import utils from "tests/utils";
import describePage, { Props } from "~/hooks/describePage";

const Component = ({ id, title }: Props) => {
    describePage({ id, title });
    return null;
};

describe("Hook - describePage", () => {
    let component;
    const id = "test";
    const title = "Test Title!";

    afterEach(() => {
        if(component) {
            component.unmount();
            component = null;
        }
    });

    it("should set page attribute", () => {
        component = utils.render(<Component id={id} />);
        const attr = document.body.getAttribute("page");

        expect(attr).toBe(id);
    });

    it("should set page title", () => {
        component = utils.render(<Component id={id} title={title} />);
        const docTitle = document.title;

        expect(docTitle).toBe(docTitle);
    });

    it("reacts to changes", () => {
        let otherId = "test2";

        component = utils.render(<Component id={id} />);
        let attr = document.body.getAttribute("page");

        expect(attr).toBe(id);

        component = component.rerender(<Component id={otherId} />);
        attr = document.body.getAttribute("page");

        expect(attr).toBe(otherId);
    });
});
