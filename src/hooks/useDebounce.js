"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = react_1.useState(value);
    react_1.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [delay, value]);
    return debouncedValue;
}
exports.default = useDebounce;
//# sourceMappingURL=useDebounce.js.map