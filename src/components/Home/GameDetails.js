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
const typography_1 = require("@react-md/typography");
const media_1 = require("@react-md/media");
const material_icons_1 = require("@react-md/material-icons");
const Store_1 = require("../../store/Store");
const nullValue = null;
const GameDetails = (props) => {
    const { addFavorite, deleteFavorite, setSelectedGame, data } = Store_1.useGameState();
    const addFavoriteHandler = (props) => {
        const game = Object.assign({}, props);
        addFavorite(game);
    };
    const deleteFavoriteHandler = (props) => {
        const game = Object.assign({}, props);
        deleteFavorite(game);
    };
    const goBackHandler = () => {
        setSelectedGame(nullValue);
    };
    let favoriteIcon;
    if (data.favorites && data.favorites.length === 0) {
        favoriteIcon = (React.createElement("div", { className: "favorite-icon", onClick: () => addFavoriteHandler(props) },
            React.createElement(material_icons_1.FavoriteBorderSVGIcon, null),
            React.createElement(typography_1.Text, { type: "headline-6" },
                React.createElement("b", null, "Add to Favorites"))));
    }
    else {
        if (data.favorites && data.favorites.some((game) => {
            return (game.title === props.title &&
                game.platform === props.platform);
        })) {
            favoriteIcon = (React.createElement("div", { className: "favorite-icon", onClick: () => deleteFavoriteHandler(props) },
                React.createElement(material_icons_1.FavoriteSVGIcon, null),
                React.createElement(typography_1.Text, { type: "headline-6" },
                    React.createElement("b", null, "Delete from Favorites"))));
        }
        else {
            favoriteIcon = (React.createElement("div", { className: "favorite-icon", onClick: () => addFavoriteHandler(props) },
                React.createElement(material_icons_1.FavoriteBorderSVGIcon, null),
                React.createElement(typography_1.Text, { type: "headline-6" },
                    React.createElement("b", null, "Add to Favorites"))));
        }
    }
    return (React.createElement("div", { className: "card-container" },
        React.createElement(card_1.Card, { className: "game" },
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
            React.createElement(card_1.CardContent, null,
                React.createElement("div", { className: "details-image-and-desc" },
                    React.createElement(media_1.MediaContainer, { className: "detailed-image-container" },
                        React.createElement("img", { src: props.image, className: "game-cover", height: "200%", alt: "Game cover art" }),
                        React.createElement("div", { className: "details-content" },
                            React.createElement(typography_1.Text, { type: "headline-6" },
                                "Developer: ",
                                React.createElement("b", null, props.developer)),
                            React.createElement(typography_1.Text, { type: "headline-6" },
                                "Genre(s):",
                                ' ',
                                React.createElement("b", null, props.genre.length === 1
                                    ? props.genre[0]
                                    : props.genre.join(', '))),
                            React.createElement(typography_1.Text, { type: "headline-6" },
                                "Publisher(s):",
                                ' ',
                                React.createElement("b", null, props.publisher.length === 1
                                    ? props.publisher[0]
                                    : props.publisher.join(', '))),
                            React.createElement(typography_1.Text, { type: "headline-6" },
                                "Release Date: ",
                                React.createElement("b", null, props.releaseDate)),
                            props.alsoAvailableOn.length !== 0 ? (React.createElement(typography_1.Text, { type: "headline-6" },
                                "Also Available On:",
                                ' ',
                                React.createElement("b", null, props.alsoAvailableOn.join(', ')))) : null,
                            favoriteIcon,
                            React.createElement(typography_1.Text, { type: "headline-6", onClick: goBackHandler },
                                React.createElement("b", { style: {
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    } }, "Go Back to Search")))),
                    React.createElement("p", { className: "detailed-desc" }, props.description
                        .replace('&hellip;', '')
                        .replace('Expand', '')))))));
};
exports.default = GameDetails;
//# sourceMappingURL=GameDetails.js.map