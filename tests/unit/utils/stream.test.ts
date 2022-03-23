import Stream from "src/utils/stream";

type TestData = 1 | 2 | 3;

const setupBaseListener = (stream: Stream<TestData>, expected) => {
    stream.on("data", data => expect(data).toBe(expected));
};

describe("Stream utility", () => {
    let stream: Stream<TestData>;

    beforeEach(() => {
        stream = new Stream();
    });

    it("supports writing", () => {
        const data = 2;

        setupBaseListener(stream, data);
        stream.write(data);
    });

    it("supports piping", () => {
        const data = 2;

        stream.pipe(packet => expect(packet).toBe(data));

        setupBaseListener(stream, data);
        stream.write(data);
    });

    it("supports transformers", () => {
        const data = 2;

        stream.transform((data, next) => next(data * 2));
        stream.pipe(packet => expect(packet).toBe(data * 2));

        setupBaseListener(stream, data);
        stream.write(data);
    });

    it("supports pumping", () => {
        const data = [1, 2, 3, 4];
        let sum = 0;

        stream.on("data", data => sum += data);
        stream.on("end",  () => expect(sum).toBe(10));

        stream.pump(data);
        stream.end();
    });
});
