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
const Store_1 = require("../store/Store");
const SearchBar_1 = __importDefault(require("../components/Home/SearchBar"));
const GamesList_1 = __importDefault(require("../components/Home/GamesList"));
const GameDetails_1 = __importDefault(require("../components/Home/GameDetails"));
const Home = () => {
    const { data } = Store_1.useGameState();
    const transformPlatform = (game) => {
        let platform;
        switch (game.platform) {
            case 'XONE':
                platform = 'xbox-one';
                break;
            case 'X360':
                platform = 'xbox-360';
                break;
            case 'XBSX':
                platform = 'xbox-series-x';
                break;
            case 'XBSS':
                platform = 'xbox-series-s';
                break;
            case 'PS4':
                platform = 'playstation-4';
                break;
            case 'PS3':
                platform = 'playstation-3';
                break;
            case 'PS2':
                platform = 'playstation-2';
                break;
            case 'PS':
                platform = 'playstation';
                break;
            case 'N64':
                platform = 'nintendo-64';
                break;
            case 'WIIU':
                platform = 'wii-u';
                break;
            case 'GB':
                platform = 'game-boy';
                break;
            case 'GBA':
                platform = 'game-boy-advance';
                break;
            case 'GC':
                platform = 'gamecube';
                break;
            default:
                platform = game.platform.toLowerCase();
        }
        return platform;
    };
    const getScoreColor = (score) => {
        if (score >= 75) {
            return 'green-score';
        }
        else if (score >= 50) {
            return 'yellow-score';
        }
        else if (score > 0) {
            return 'red-score';
        }
        else {
            return 'gray-score';
        }
    };
    return (React.createElement("div", null,
        React.createElement(SearchBar_1.default, { transform: transformPlatform }),
        data.selectedGame ? (React.createElement(GameDetails_1.default, Object.assign({}, data.selectedGame, { transformedPlatform: transformPlatform(data.selectedGame), scoreColor: getScoreColor }))) : (React.createElement(GamesList_1.default, { scoreColor: getScoreColor, transform: transformPlatform }))));
};
exports.default = Home;
//# sourceMappingURL=Home.js.map