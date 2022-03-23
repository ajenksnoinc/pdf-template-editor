import classNames from "~/utils/classnames";

describe("classNames", () => {
    it("should support basic function", () => {
        let output = classNames();
        expect(output).toBe("");

        output = classNames("a");
        expect(output).toBe("a");

        output = classNames("a", " b", "c", " ");
        expect(output).toBe("a b c");
    });

    it("should support conditions", () => {
        let output = classNames("a", true && "b", false && "c");
        expect(output).toBe("a b");

        output = classNames("a", false);
        expect(output).toBe("a");
    });

    it("should support arrays", () => {
        let output = classNames("a", [ false, "b", true && "c" ]);
        expect(output).toBe("a b c");
    });

    it("should support objects", () => {
        let output = classNames("a", true && "b", { c: false, d: true });
        expect(output).toBe("a b d");
    });
});
