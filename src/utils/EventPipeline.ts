import createEmitter from "./emitter";

type Types = {
    [key: string]: any[]
};

const pipeline = createEmitter<Types>();
export default pipeline;
