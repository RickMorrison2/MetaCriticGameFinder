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
const react_1 = require("react");
const useDebounce_1 = __importDefault(require("../../hooks/useDebounce"));
const axios_1 = __importDefault(require("axios"));
const Store_1 = require("../../store/Store");
const SearchBar = (props) => {
    const { saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, data } = Store_1.useGameState();
    const debouncedSearchTerm = useDebounce_1.default(data.searchText, 300);
    const truth = true;
    const falsehood = false;
    const nullValue = null;
    react_1.useEffect(() => {
        const searchInputHandler = (search) => {
            setSearchTouched(truth);
            setSelectedGame(nullValue);
            return axios_1.default({
                method: 'GET',
                url: `https://chicken-coop.p.rapidapi.com/games?title=${search}`,
                headers: {
                    'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
                    'x-rapidapi-key': 'f095ed5092mshd6d7d19e4a78f68p1978cfjsnbe9e447696cc',
                },
            }).then((res) => {
                if (res.data.result !== 'No result' &&
                    res.data.result.length !== 0) {
                    const updatedGamesList = [];
                    res.data.result.map((game) => updatedGamesList.push(game));
                    saveGames(updatedGamesList);
                }
                else {
                    const nullArray = [];
                    saveGames(nullArray);
                }
                console.log('res.data: ', res.data);
            });
        };
        if (debouncedSearchTerm) {
            setSelectedGame(nullValue);
            let removePlusSign = debouncedSearchTerm.replace('+', '%2B');
            setIsSearching(truth);
            searchInputHandler(removePlusSign).then((res) => {
                setIsSearching(falsehood);
            });
        }
        else {
            const nullArray = [];
            saveGames(nullArray);
        }
    }, [debouncedSearchTerm, falsehood, truth, setSearchTouched, saveGames, setSelectedGame, setIsSearching]);
    let gamesListFull = !data.isSearching && data.gamesList && data.gamesList.length > 0;
    let { transform } = props;
    const updatedGamesList = [];
    react_1.useEffect(() => {
        if (data.gamesList && data.gamesList.length > 0) {
            for (let game of data.gamesList) {
                const platform = transform(game);
                const removePlusSign = game.title.replace('+', '%2B');
                axios_1.default({
                    method: 'GET',
                    url: `https://chicken-coop.p.rapidapi.com/games/${removePlusSign.toLowerCase()}?platform=${platform}`,
                    headers: {
                        'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
                        'x-rapidapi-key': 'f095ed5092mshd6d7d19e4a78f68p1978cfjsnbe9e447696cc',
                    },
                }).then((res) => {
                    updatedGamesList.push(Object.assign(Object.assign({}, res.data.result), { platform: game.platform }));
                    if (game === data.gamesList[data.gamesList.length - 1]) {
                        saveUpdatedGames(updatedGamesList);
                        setIsSearching(falsehood);
                    }
                });
            }
        }
    }, [gamesListFull, data.gamesList]);
    return (React.createElement("div", { className: "search-container" },
        React.createElement("input", { className: "search", type: "text", placeholder: "Search...", value: data.searchText, onChange: (e) => {
                const value = e.target.value;
                setSearchText(value);
            } })));
};
exports.default = SearchBar;
//# sourceMappingURL=SearchBar.js.map