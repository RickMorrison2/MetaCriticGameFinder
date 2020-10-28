import * as React from 'react';
import axios from 'axios';
import Game from './Game';
import { useGameState } from '../../store/Store';


type gameTypes = {
    title: string, 
    platform: string, 
    releaseDate: string, 
    score: number, 
    image: string, 
    description: string
}

const GamesList = (props: any) => {
    const {setSelectedGame, data} = useGameState();

    const clickHandler = (game: gameTypes) => {
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
            setSelectedGame(resGame);
        });
    };

    let games;

    if (
        data.searchTouched &&
        data.updatedGamesList &&
        data.updatedGamesList.length !== 0
    ) {
        games = (
            <div className="games-list">
                {data.updatedGamesList.map((game, index) => (
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
        data.searchTouched &&
        !data.isSearching &&
        data.gamesList &&
        data.gamesList.length === 0
    ) {
        games = (
            <div className="no-games">
                No games found matching that title. Please try another search.
            </div>
        );
    } else if (
        data.isSearching
         ||
        (data.gamesList && data.gamesList.length !== 0 &&
            data.gamesList.length !== data.updatedGamesList.length)
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
