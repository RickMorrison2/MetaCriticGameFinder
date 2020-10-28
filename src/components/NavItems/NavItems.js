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
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const material_icons_1 = require("@react-md/material-icons");
/**
 * Note: The `parentId` **must** be defaulted to `null` for the navigation tree
 * to render correctly since this uses the @react-md/tree package behind the
 * scenes. Each item that has a `parentId` set to `null` will appear at the root
 * level of your navigation tree.
 */
const createRoute = (pathname, children, leftAddon = undefined, parentId = null) => {
    return {
        itemId: pathname,
        parentId,
        to: pathname,
        children,
        leftAddon,
    };
};
const navItems = {
    '/': createRoute('/', 'Search', React.createElement(material_icons_1.SearchSVGIcon, null)),
    '/favorites': createRoute('/favorites', 'Favorites', React.createElement(material_icons_1.FavoriteSVGIcon, null)),
};
exports.default = navItems;
//# sourceMappingURL=NavItems.js.map