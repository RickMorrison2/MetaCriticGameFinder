import React, { useContext } from 'react';
import { Context } from '../../store/Store';
import { Card, CardTitle, CardHeader, CardContent } from '@react-md/card';
import { FavoriteSVGIcon } from '@react-md/material-icons';
import { MediaContainer } from '@react-md/media';
import { Text } from '@react-md/typography';

const Game = (props) => {
    const [state, dispatch] = useContext(Context);

    return (
        <Card className="game" onClick={props.click}>
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
            <CardContent className="image-and-content">
                <MediaContainer className="image-container">
                    <img src={props.image} alt="" />
                </MediaContainer>
                <div className="content">
                    <span>
                        {props.description ? (
                            <Text className="description" type="body-1">
                                {props.description.substring(0, 249)}...
                            </Text>
                        ) : null}
                    </span>
                    <div className="favorite">
                        <div>
                            {state.favorites.length !== 0 &&
                            state.favorites.some((el) => {
                                return (
                                    props.title === el.title &&
                                    props.platform === el.platform
                                );
                            }) ? (
                                <FavoriteSVGIcon />
                            ) : null}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Game;
