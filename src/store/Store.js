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
exports.useGameState = exports.GamesContextProvider = exports.Context = void 0;
const React = __importStar(require("react"));
const react_1 = require("react");
const initialState = {
    data: {
        searchText: '',
        searchTouched: false,
        gamesList: [],
        updatedGamesList: [],
        isSearching: false,
        selectedGame: null,
        favorites: [],
    },
    saveGames: () => ({}),
    setSearchText: () => ({}),
    setSearchTouched: () => ({}),
    saveUpdatedGames: () => ({}),
    setSelectedGame: () => ({}),
    setIsSearching: () => ({}),
    addFavorite: () => ({}),
    deleteFavorite: () => ({}),
};
// const Store = ({children}: Props) => {
//     const [ state, dispatch ] = useReducer(Reducer, initialState);
//     const value = {state: state as State, dispatch}
//     return (
//         <Context.Provider 
//         value={value}>
//             {children}
//         </Context.Provider>
//     )
// }
exports.Context = react_1.createContext(initialState);
// export default Store;
const gamesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GAMES_LIST':
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { gamesList: action.gamesList }) });
        case 'SET_SEARCH_TEXT':
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { searchText: action.searchText }) });
        case 'SET_SEARCH_TOUCHED':
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { searchTouched: action.searchTouched }) });
        case 'SET_UPDATED_GAMES_LIST':
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { updatedGamesList: action.updatedGamesList }) });
        case 'SET_SELECTED_GAME':
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { selectedGame: action.selectedGame }) });
        case 'SET_IS_SEARCHING':
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { isSearching: action.isSearching }) });
        case 'ADD_FAVORITE':
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { favorites: state.data.favorites.concat(Object.assign({}, action.game)) }) });
        case 'DELETE_FAVORITE':
            console.log('made it to the Store case');
            return Object.assign(Object.assign({}, state), { data: Object.assign(Object.assign({}, state.data), { favorites: state.data.favorites.filter((game) => {
                        let gameKeys = Object.keys(game);
                        let payloadKeys = Object.keys(action.game);
                        console.log('gameKeys: ', gameKeys);
                        console.log('payloadKeys: ', payloadKeys);
                        if (gameKeys.length !== payloadKeys.length) {
                            return true;
                        }
                        for (let key of gameKeys) {
                            console.log('game[key]: ', game[key]);
                            console.log('action.game[key]: ', action.game[key]);
                            if (game[key] !== action.game[key]) {
                                return true;
                            }
                            if (game['title'] === action.game['title'] && game['platform'] === action.game['platform']) {
                                return false;
                            }
                        }
                        return false;
                    }) }) });
        default:
            return Object.assign({}, initialState);
    }
};
exports.GamesContextProvider = ({ children }) => {
    const saveGames = (gamesList) => {
        dispatch({ type: 'SET_GAMES_LIST', gamesList });
    };
    const setSearchText = (searchText) => {
        dispatch({ type: 'SET_SEARCH_TEXT', searchText });
    };
    const setSearchTouched = (searchTouched) => {
        dispatch({ type: 'SET_SEARCH_TOUCHED', searchTouched });
    };
    const saveUpdatedGames = (updatedGamesList) => {
        dispatch({ type: 'SET_UPDATED_GAMES_LIST', updatedGamesList });
    };
    const setSelectedGame = (selectedGame) => {
        dispatch({ type: 'SET_SELECTED_GAME', selectedGame });
    };
    const setIsSearching = (isSearching) => {
        dispatch({ type: 'SET_IS_SEARCHING', isSearching });
    };
    const addFavorite = (game) => {
        dispatch({ type: 'ADD_FAVORITE', game });
    };
    const deleteFavorite = (game) => {
        dispatch({ type: 'DELETE_FAVORITE', game });
    };
    const [gamesState, dispatch] = react_1.useReducer(gamesReducer, Object.assign(Object.assign({}, initialState), { saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, addFavorite, deleteFavorite }));
    return (React.createElement(exports.Context.Provider, { value: gamesState }, children));
};
exports.useGameState = () => {
    const { saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, addFavorite, deleteFavorite, data } = react_1.useContext(exports.Context);
    return { saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, addFavorite, deleteFavorite, data };
};
//# sourceMappingURL=Store.js.map