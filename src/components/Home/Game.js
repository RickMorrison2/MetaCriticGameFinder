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
const card_1 = require("@react-md/card");
const material_icons_1 = require("@react-md/material-icons");
const media_1 = require("@react-md/media");
const typography_1 = require("@react-md/typography");
const Store_1 = require("../../store/Store");
const Game = (props) => {
    const { data } = Store_1.useGameState();
    return (React.createElement(card_1.Card, { className: "game", onClick: props.click },
        React.createElement(card_1.CardHeader, null,
            React.createElement(card_1.CardTitle, { className: "title-and-score" },
                React.createElement("div", { className: "title-wrapper" },
                    React.createElement("div", { className: "title" }, props.title),
                    React.createElement("div", { className: "platform" },
                        props.platform,
                        ",",
                        ' ',
                        props.releaseDate.substring(props.releaseDate.length - 5, props.releaseDate.length))),
                React.createElement("div", { className: props.scoreColor(props.score) }, props.score))),
        React.createElement(card_1.CardContent, { className: "image-and-content" },
            React.createElement(media_1.MediaContainer, { className: "image-container" },
                React.createElement("img", { src: props.image, alt: "" })),
            React.createElement("div", { className: "content" },
                React.createElement("span", null, props.description ? (React.createElement(typography_1.Text, { className: "description", type: "body-1" },
                    props.description.substring(0, 249),
                    "...")) : null),
                React.createElement("div", { className: "favorite" },
                    React.createElement("div", null, data.favorites && data.favorites.length !== 0 &&
                        data.favorites.some((el) => {
                            return (props.title === el.title &&
                                props.platform === el.platform);
                        }) ? (React.createElement(material_icons_1.FavoriteSVGIcon, null)) : null))))));
};
exports.default = Game;
//# sourceMappingURL=Game.js.map