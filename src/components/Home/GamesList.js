import React, { useContext } from 'react';
import axios from 'axios';
import { Context } from '../../store/Store';
import Game from './Game';

const GamesList = (props) => {
    const [state, dispatch] = useContext(Context);

    const clickHandler = (game) => {
        const platform = props.transform(game);
        axios({
            method: 'GET',
            url: `https://chicken-coop.p.rapidapi.com/games/${game.title.toLowerCase()}?platform=${platform}`,
            headers: {
                'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
                'x-rapidapi-key':
                    'f095ed5092mshd6d7d19e4a78f68p1978cfjsnbe9e447696cc',
            },
        }).then((res) => {
            console.log('clicked, res.data: ', res.data);
            const resGame = { ...res.data.result, platform: game.platform };
            dispatch({ type: 'SET_SELECTED_GAME', payload: resGame });
        });
    };

    let games;

    if (
        state.searchTouched &&
        state.updatedGamesList &&
        state.updatedGamesList.length !== 0
    ) {
        games = (
            <div className="games-list">
                {state.updatedGamesList.map((game, index) => (
                    <Game
                        className="game"
                        {...game}
                        position={index}
                        transform={props.transform}
                        scoreColor={props.scoreColor}
                        key={index}
                        click={() => clickHandler(game)}
                    />
                ))}
            </div>
        );
    } else if (
        state.searchTouched &&
        !state.isSearching &&
        state.gamesList.length === 0
    ) {
        games = (
            <div className="no-games">
                No games found matching that title. Please try another search.
            </div>
        );
    } else if (
        state.isSearching ||
        (state.gamesList.length !== 0 &&
            state.gamesList.length !== state.updatedGamesList.length)
    ) {
        games = <div className="searching">Searching...</div>;
    } else {
        games = (
            <div className="please-use">
                Welcome to the MetaCritic Game Finder. Please use the search bar
                above to start finding games.
            </div>
        );
    }

    return <div className="games-list-container">{games}</div>;
};

export default GamesList;
