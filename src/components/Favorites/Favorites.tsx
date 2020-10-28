import * as React from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardSubtitle,
} from '@react-md/card';
import { MediaContainer } from '@react-md/media';
import { DeleteSVGIcon } from '@react-md/material-icons';
import { useGameState } from '../../store/Store';

type gameTypes = {
    title: string, 
    platform: string, 
    releaseDate: string, 
    score: number, 
    image: string, 
    description: string
}

type State = {
    searchText: string, 
    searchTouched: boolean, 
    gamesList: gameTypes[], 
    updatedGamesList: gameTypes[], 
    isSearching: boolean, 
    selectedGame: null | gameTypes, 
    favorites: null | gameTypes[],
    [Symbol.iterator]: Function
}

const Favorites = ({transform}: {transform: (game: gameTypes) => string}) => {
    const {setSelectedGame, deleteFavorite, data} = useGameState();

    const clickHandler = (game: gameTypes) => {
        const platform = transform(game);
        axios({
            method: 'GET',
            url: `https://chicken-coop.p.rapidapi.com/games/${game.title.toLowerCase()}?platform=${platform}`,
            headers: {
                'x-rapidapi-host': 'chicken-coop.p.rapidapi.com',
                'x-rapidapi-key':
                    'f095ed5092mshd6d7d19e4a78f68p1978cfjsnbe9e447696cc',
            },
        }).then((res) => {
            const resGame = { ...res.data.result, platform: game.platform };
            setSelectedGame(resGame);
        });
    };

    const deleteFavoriteHandler = (game: any) => {
        deleteFavorite(game)
    };

    return (
        <div className="favorites-list">
            {data.favorites && data.favorites.map((game: any, i: number) => (
                <Card key={i}>
                    <CardHeader>
                        <CardTitle>{game.title}</CardTitle>
                        <CardSubtitle>{game.platform}</CardSubtitle>
                    </CardHeader>
                    <CardContent className="image-and-delete">
                        <MediaContainer onClick={() => clickHandler(game)}>
                            <img src={game.image} alt="" />
                        </MediaContainer>
                        <DeleteSVGIcon
                            onClick={
                                () =>
                                    deleteFavoriteHandler(
                                        game
                                    )
                            }
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Favorites;
