import * as React from 'react'; 
import { useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import axios from 'axios';
import { useGameState } from '../../store/Store';

const SearchBar = (props: any) => {
    const {saveGames, setSearchText, setSearchTouched, saveUpdatedGames, setSelectedGame, setIsSearching, data} = useGameState();

    const debouncedSearchTerm = useDebounce(data.searchText, 300);

    type gameTypes = {
        title: string, 
        platform: string, 
        releaseDate: string, 
        score: number, 
        image: string, 
        description: string
    }
    const truth: any = true;
    const falsehood: any = false;
    const nullValue: any = null;

    useEffect(() => {
        const searchInputHandler = (search: string) => {
            setSearchTouched(truth);
            setSelectedGame(nullValue);
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
                    const updatedGamesList: any = [];
                    res.data.result.map((game: gameTypes) => updatedGamesList.push(game));
                    saveGames(updatedGamesList);
                } else {
                    const nullArray: any = []
                    saveGames(nullArray);
                }
                console.log('res.data: ', res.data);
            });
        };

        if (debouncedSearchTerm) {
            setSelectedGame(nullValue);
            let removePlusSign = debouncedSearchTerm.replace('+', '%2B');
            setIsSearching(truth);
            searchInputHandler(removePlusSign).then((res) => {
                setIsSearching(falsehood);
            });
        } else {
            const nullArray: any = [];
            saveGames(nullArray);
        }
    }, [debouncedSearchTerm, falsehood, truth, setSearchTouched, saveGames, setSelectedGame, setIsSearching]);

    let gamesListFull = !data.isSearching && data.gamesList && data.gamesList.length > 0;

    let {transform} = props;

    const updatedGamesList: any = [];
    useEffect(() => {
        if (data.gamesList && data.gamesList.length > 0) {
        for (let game of data.gamesList) {
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
                if (game === data.gamesList[data.gamesList.length - 1]) {
                    saveUpdatedGames(updatedGamesList);
                    setIsSearching(falsehood);
                }
            });
        }
    }
    }, [gamesListFull, data.gamesList]);

    return (
        <div className="search-container">
            <input
                className="search"
                type="text"
                placeholder="Search..."
                value={data.searchText}
                onChange={(e) => {
                    const value: any = e.target.value;
                    setSearchText(value);
                }}
            />
        </div>
    );
};

export default SearchBar;
