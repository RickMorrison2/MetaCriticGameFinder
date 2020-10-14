import React, { useEffect, useContext } from 'react';
import useDebounce from '../../hooks/useDebounce';
import axios from 'axios';
import { Context } from '../../store/Store';

const SearchBar = (props) => {
    const [state, dispatch] = useContext(Context);

    const debouncedSearchTerm = useDebounce(state.searchText, 300);

    useEffect(() => {
        const searchInputHandler = (search) => {
            dispatch({ type: 'SET_SEARCH_TOUCHED', payload: true });
            dispatch({ type: 'SET_SELECTED_GAME', payload: null });
            return axios({
                method: 'GET',
                url: `https://chicken-coop.p.rapidapi.com/games?title=${search}`,
                headers: {
                    'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
                    'x-rapidapi-key':
                        'f095ed5092mshd6d7d19e4a78f68p1978cfjsnbe9e447696cc',
                },
            }).then((res) => {
                if (
                    res.data.result !== 'No result' &&
                    res.data.result.length !== 0
                ) {
                    const updatedGamesList = [];
                    res.data.result.map((game) => updatedGamesList.push(game));
                    dispatch({
                        type: 'SET_GAMES_LIST',
                        payload: updatedGamesList,
                    });
                } else {
                    dispatch({ type: 'SET_GAMES_LIST', payload: [] });
                }
                console.log('res.data: ', res.data);
            });
        };

        if (debouncedSearchTerm) {
            dispatch({ type: 'SET_SELECTED_GAME', payload: null });
            let removePlusSign = debouncedSearchTerm.replace('+', '%2B');
            dispatch({ type: 'SET_IS_SEARCHING', payload: true });
            searchInputHandler(removePlusSign).then((res) => {
                dispatch({ type: 'SET_IS_SEARCHING', payload: false });
            });
        } else {
            dispatch({ type: 'SET_GAMES_LIST', payload: [] });
        }
    }, [debouncedSearchTerm, dispatch]);

    let gamesListFull = !state.isSearching && state.gamesList.length > 0;
    const { transform } = props;

    const updatedGamesList = [];
    useEffect(() => {
        for (let game of state.gamesList) {
            const platform = transform(game);
            const removePlusSign = game.title.replace('+', '%2B');
            axios({
                method: 'GET',
                url: `https://chicken-coop.p.rapidapi.com/games/${removePlusSign.toLowerCase()}?platform=${platform}`,
                headers: {
                    'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
                    'x-rapidapi-key':
                        'f095ed5092mshd6d7d19e4a78f68p1978cfjsnbe9e447696cc',
                },
            }).then((res) => {
                updatedGamesList.push({
                    ...res.data.result,
                    platform: game.platform,
                });
                if (game === state.gamesList[state.gamesList.length - 1]) {
                    dispatch({
                        type: 'SET_UPDATED_GAMES_LIST',
                        payload: updatedGamesList,
                    });
                    dispatch({ type: 'SET_IS_SEARCHING', payload: false });
                }
            });
        }
    }, [gamesListFull, state.gamesList]);

    return (
        <div className="search-container">
            <input
                className="search"
                type="text"
                placeholder="Search..."
                value={state.searchText}
                onChange={(e) => {
                    dispatch({
                        type: 'SET_SEARCH_TEXT',
                        payload: e.target.value,
                    });
                }}
            />
        </div>
    );
};

export default SearchBar;
