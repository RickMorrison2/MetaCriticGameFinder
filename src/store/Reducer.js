const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload
            }
        case 'SET_SEARCH_TOUCHED':
            return {
                ...state,
                searchTouched: action.payload
            }
        case 'SET_GAMES_LIST':
            return {
                ...state,
                gamesList: action.payload
            };
        case 'SET_UPDATED_GAMES_LIST':
            return {
                ...state,
                updatedGamesList: action.payload
            };
        case 'SET_SELECTED_GAME':
            return {
                ...state,
                selectedGame: action.payload
            }
        case 'SET_IS_SEARCHING':
            return {
                ...state,
                isSearching: action.payload
            }
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.concat({...action.payload})
            };
        case 'DELETE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(game => {
                    let gameKeys = Object.keys(game);
                    let payloadKeys = Object.keys(action.payload);
                    if (gameKeys.length !== payloadKeys.length) {
                        return true;
                    }
                    for (let key of gameKeys) {
                        if (game[key] !== action.payload[key]) {
                            return true;
                        }
                    }
                    return false;
                })
            };
        default:
            return {
                ...state,
            }
    }
}

export default Reducer;