import * as React from 'react';
import { createContext, useReducer, useContext, Dispatch, SetStateAction } from 'react';

type Props = {
    children: React.ReactNode,
}

type gameTypes = {
    title: string, 
    platform: string, 
    releaseDate: string, 
    score: number, 
    image: string, 
    description: string
}

type State = {
    data: {
        searchText: string, 
        searchTouched: boolean, 
        gamesList: gameTypes[], 
        updatedGamesList: gameTypes[], 
        isSearching: boolean, 
        selectedGame: null | gameTypes, 
        favorites: null | gameTypes[]
    },
    saveGames: Dispatch<SetStateAction<State>>,
    setSearchText: Dispatch<SetStateAction<State>>,
    setSearchTouched: Dispatch<SetStateAction<State>>,
    saveUpdatedGames: Dispatch<SetStateAction<State>>,
    setSelectedGame: Dispatch<SetStateAction<State>>,
    setIsSearching: Dispatch<SetStateAction<State>>,
    addFavorite: Dispatch<SetStateAction<State>>,
    deleteFavorite: Dispatch<SetStateAction<State>>,
}

const initialState: State  = {
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
}

type IGamesContextProviderProps = {
    children: any;
}


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

export const Context = createContext(initialState);
// export default Store;

const gamesReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_GAMES_LIST':
            return {
                ...state,
                data: {
                    ...state.data,
                    gamesList: action.gamesList
                }
            };
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                data: {
                    ...state.data,
                    searchText: action.searchText
                }
            };
        case 'SET_SEARCH_TOUCHED':
            return {
                ...state,
                data: {
                    ...state.data,
                    searchTouched: action.searchTouched
                }
            };
        case 'SET_UPDATED_GAMES_LIST':
            return {
                ...state,
                data: {
                    ...state.data,
                    updatedGamesList: action.updatedGamesList
                }
            };
        case 'SET_SELECTED_GAME':
            return {
                ...state,
                data: {
                    ...state.data,
                    selectedGame: action.selectedGame
                }
            };
        case 'SET_IS_SEARCHING':
            return {
                ...state,
                data: {
                    ...state.data,
                    isSearching: action.isSearching
                }
            };
        case 'ADD_FAVORITE':
            return {
                ...state,
                data: {
                    ...state.data,
                    favorites: state.data.favorites.concat({...action.game})
                }
            };
        case 'DELETE_FAVORITE':
            console.log('made it to the Store case');
            return {
                ...state,
                data: {
                    ...state.data,
                    favorites: state.data.favorites.filter((game: any) => {
                        let gameKeys: string[] = Object.keys(game);
                        let payloadKeys: string[] = Object.keys(action.game);
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
                    })
                }
            }
        default: 
            return {...initialState}
    }
}

export const GamesContextProvider = ({children}: IGamesContextProviderProps) => {
    const saveGames = (gamesList: gameTypes[]) => {
        dispatch({type: 'SET_GAMES_LIST', gamesList})
    }
    const setSearchText = (searchText: string) => {
        dispatch({type: 'SET_SEARCH_TEXT', searchText})
    }
    const setSearchTouched = (searchTouched: boolean) => {
        dispatch({type: 'SET_SEARCH_TOUCHED', searchTouched})
    }
    const saveUpdatedGames = (updatedGamesList: gameTypes[]) => {
        dispatch({type: 'SET_UPDATED_GAMES_LIST', updatedGamesList})
    }
    const setSelectedGame = (selectedGame: gameTypes) => {
        dispatch({type: 'SET_SELECTED_GAME', selectedGame})
    }
    const setIsSearching = (isSearching: boolean) => {
        dispatch({type: 'SET_IS_SEARCHING', isSearching})
    }
    const addFavorite = (game: gameTypes) => {
        dispatch({type: 'ADD_FAVORITE', game})
    }
    const deleteFavorite = (game: gameTypes) => {
        dispatch({type: 'DELETE_FAVORITE', game})
    }
    const [ gamesState, dispatch ] = useReducer(gamesReducer, {...initialState, saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, addFavorite, deleteFavorite})
    return (<Context.Provider value={gamesState}>
        {children}
    </Context.Provider>)
}

export const useGameState = () => {
    const {saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, addFavorite, deleteFavorite, data} = useContext(Context);
    return {saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, addFavorite, deleteFavorite, data}
}