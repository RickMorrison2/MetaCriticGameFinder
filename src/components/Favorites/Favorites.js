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
const axios_1 = __importDefault(require("axios"));
const card_1 = require("@react-md/card");
const media_1 = require("@react-md/media");
const material_icons_1 = require("@react-md/material-icons");
const Store_1 = require("../../store/Store");
const Favorites = ({ transform }) => {
    const { setSelectedGame, deleteFavorite, data } = Store_1.useGameState();
    const clickHandler = (game) => {
        const platform = transform(game);
        axios_1.default({
            method: 'GET',
            url: `https://chicken-coop.p.rapidapi.com/games/${game.title.toLowerCase()}?platform=${platform}`,
            headers: {
                'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
                'x-rapidapi-key': 'f095ed5092mshd6d7d19e4a78f68p1978cfjsnbe9e447696cc',
            },
        }).then((res) => {
            const resGame = Object.assign(Object.assign({}, res.data.result), { platform: game.platform });
            setSelectedGame(resGame);
        });
    };
    const deleteFavoriteHandler = (game) => {
        deleteFavorite(game);
    };
    return (React.createElement("div", { className: "favorites-list" }, data.favorites && data.favorites.map((game, i) => (React.createElement(card_1.Card, { key: i },
        React.createElement(card_1.CardHeader, null,
            React.createElement(card_1.CardTitle, null, game.title),
            React.createElement(card_1.CardSubtitle, null, game.platform)),
        React.createElement(card_1.CardContent, { className: "image-and-delete" },
            React.createElement(media_1.MediaContainer, { onClick: () => clickHandler(game) },
                React.createElement("img", { src: game.image, alt: "" })),
            React.createElement(material_icons_1.DeleteSVGIcon, { onClick: () => deleteFavoriteHandler(game) })))))));
};
exports.default = Favorites;
//# sourceMappingURL=Favorites.js.map