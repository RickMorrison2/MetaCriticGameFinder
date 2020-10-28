import * as React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@react-md/card';
import { Text } from '@react-md/typography';
import { MediaContainer } from '@react-md/media';
import {
    FavoriteBorderSVGIcon,
    FavoriteSVGIcon,
} from '@react-md/material-icons';
import { useGameState } from '../../store/Store';

type gameTypes = {
    title: string, 
    platform: string, 
    releaseDate: string, 
    score: number, 
    image: string, 
    description: string
}

const nullValue: any = null;

const GameDetails = (props: any) => {
    const {addFavorite, deleteFavorite, setSelectedGame, data} = useGameState();

    const addFavoriteHandler = (
        props: any
    ) => {
        const game = {...props}; 
        addFavorite(game);
    };

    const deleteFavoriteHandler = (
        props: any
    ) => {
        const game = {...props};
        deleteFavorite(game);
    };

    const goBackHandler = () => {
        setSelectedGame(nullValue);
    };

    let favoriteIcon;

    if (data.favorites && data.favorites.length === 0) {
        favoriteIcon = (
            <div
                className="favorite-icon"
                onClick={() =>
                    addFavoriteHandler(props)
                }
            >
                <FavoriteBorderSVGIcon />
                <Text type="headline-6">
                    <b>Add to Favorites</b>
                </Text>
            </div>
        );
    } else {
        if (
            data.favorites && data.favorites.some((game) => {
                return (
                    game.title === props.title &&
                    game.platform === props.platform
                );
            })
        ) {
            favoriteIcon = (
                <div
                    className="favorite-icon"
                    onClick={() =>
                        deleteFavoriteHandler(
                            props
                        )
                    }
                >
                    <FavoriteSVGIcon />
                    <Text type="headline-6">
                        <b>Delete from Favorites</b>
                    </Text>
                </div>
            );
        } else {
            favoriteIcon = (
                <div
                    className="favorite-icon"
                    onClick={() =>
                        addFavoriteHandler(
                            props
                        )
                    }
                >
                    <FavoriteBorderSVGIcon />
                    <Text type="headline-6">
                        <b>Add to Favorites</b>
                    </Text>
                </div>
            );
        }
    }

    return (
        <div className="card-container">
            <Card className="game">
                <CardHeader>
                    <CardTitle className="title-and-score">
                        <div className="title-wrapper">
                            <div className="title">{props.title}</div>
                            <div className="platform">
                                {props.platform},{' '}
                                {props.releaseDate.substring(
                                    props.releaseDate.length - 5,
                                    props.releaseDate.length
                                )}
                            </div>
                        </div>
                        <div className={props.scoreColor(props.score)}>
                            {props.score}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="details-image-and-desc">
                        <MediaContainer className="detailed-image-container">
                            <img
                                src={props.image}
                                className="game-cover"
                                height="200%"
                                alt="Game cover art"
                            />
                            <div className="details-content">
                                <Text type="headline-6">
                                    Developer: <b>{props.developer}</b>
                                </Text>
                                <Text type="headline-6">
                                    Genre(s):{' '}
                                    <b>
                                        {props.genre.length === 1
                                            ? props.genre[0]
                                            : props.genre.join(', ')}
                                    </b>
                                </Text>
                                <Text type="headline-6">
                                    Publisher(s):{' '}
                                    <b>
                                        {props.publisher.length === 1
                                            ? props.publisher[0]
                                            : props.publisher.join(', ')}
                                    </b>
                                </Text>
                                <Text type="headline-6">
                                    Release Date: <b>{props.releaseDate}</b>
                                </Text>
                                {props.alsoAvailableOn.length !== 0 ? (
                                    <Text type="headline-6">
                                        Also Available On:{' '}
                                        <b>
                                            {props.alsoAvailableOn.join(', ')}
                                        </b>
                                    </Text>
                                ) : null}
                                {favoriteIcon}
                                <Text type="headline-6" onClick={goBackHandler}>
                                    <b
                                        style={{
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Go Back to Search
                                    </b>
                                </Text>
                            </div>
                        </MediaContainer>
                        <p className="detailed-desc">
                            {props.description
                                .replace('&hellip;', '')
                                .replace('Expand', '')}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GameDetails;
