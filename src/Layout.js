"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const layout_1 = require("@react-md/layout");
const react_router_dom_1 = require("react-router-dom");
const NavItems_1 = __importDefault(require("./components/NavItems/NavItems"));
const App_1 = __importDefault(require("./App"));
function MyLayout() {
    const { pathname } = react_router_dom_1.useLocation();
    return (React.createElement(layout_1.Layout, { title: "MetaCritic Game Finder", navHeaderTitle: "Navigation", treeProps: layout_1.useLayoutNavigation(NavItems_1.default, pathname, react_router_dom_1.Link) },
        React.createElement(App_1.default, null)));
}
exports.default = MyLayout;
//# sourceMappingURL=Layout.js.map