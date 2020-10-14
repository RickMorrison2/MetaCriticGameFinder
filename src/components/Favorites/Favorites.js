import React, { useContext } from 'react';
import axios from 'axios';
import { Context } from '../../store/Store';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardSubtitle,
} from '@react-md/card';
import { MediaContainer } from '@react-md/media';
import { DeleteSVGIcon } from '@react-md/material-icons';

const Favorites = (props) => {
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

    const deleteFavoriteHandler = (title, platform, image) => {
        dispatch({
            type: 'DELETE_FAVORITE',
            payload: { title: title, platform: platform, image: image },
        });
    };

    return (
        <div className="favorites-list">
            {state.favorites.map((game, i) => (
                <Card key={i} onClick={() => clickHandler(game)}>
                    <CardHeader>
                        <CardTitle>{game.title}</CardTitle>
                        <CardSubtitle>{game.platform}</CardSubtitle>
                    </CardHeader>
                    <CardContent className="image-and-delete">
                        <MediaContainer>
                            <img src={game.image} alt="" />
                        </MediaContainer>
                        <DeleteSVGIcon
                            onClick={
                                () =>
                                    deleteFavoriteHandler(
                                        game.title,
                                        game.platform,
                                        game.image
                                    )
                                // console.log('deleting ', game.title, game.platform)
                                // console.log('favorite items: ', state.favorites)
                            }
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Favorites;
