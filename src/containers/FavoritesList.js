import React, { useContext } from 'react';
import { Context } from '../store/Store';
import Favorites from '../components/Favorites/Favorites';
import GameDetails from '../components/Home/GameDetails';

const FavoritesList = () => {
    const [state, dispatch] = useContext(Context);

    const transformPlatform = (game) => {
        let platform;
        switch (game.platform) {
            case 'XONE':
                platform = 'xbox-one';
                break;
            case 'X360':
                platform = 'xbox-360';
                break;
            case 'XBSX':
                platform = 'xbox-series-x';
                break;
            case 'XBSS':
                platform = 'xbox-series-s';
                break;
            case 'PS4':
                platform = 'playstation-4';
                break;
            case 'PS3':
                platform = 'playstation-3';
                break;
            case 'PS2':
                platform = 'playstation-2';
                break;
            case 'PS':
                platform = 'playstation';
                break;
            case 'N64':
                platform = 'nintendo-64';
                break;
            case 'WIIU':
                platform = 'wii-u';
                break;
            case 'GB':
                platform = 'game-boy';
                break;
            case 'GBA':
                platform = 'game-boy-advance';
                break;
            case 'GC':
                platform = 'gamecube';
                break;
            default:
                platform = game.platform.toLowerCase();
        }
        return platform;
    };

    const getScoreColor = (score) => {
        if (score >= 75) {
            return 'green-score';
        } else if (score >= 50) {
            return 'yellow-score';
        } else if (score > 0) {
            return 'red-score';
        } else {
            return 'gray-score';
        }
    };

    return (
        <div>
            {state.selectedGame ? (
                <GameDetails
                    {...state.selectedGame}
                    transformedPlatform={transformPlatform(state.selectedGame)}
                    scoreColor={getScoreColor}
                />
            ) : (
                <Favorites transform={transformPlatform} />
            )}
        </div>
    );
};

export default FavoritesList;
