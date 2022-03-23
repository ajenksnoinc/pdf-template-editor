import { useMemo } from "react";
import { nanoid } from "nanoid";

export default (size = 12) => useMemo(() => nanoid(size), [ size ]);
