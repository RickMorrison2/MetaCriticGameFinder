import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import './App.scss';
import Home from './containers/Home';
import FavoritesList from './containers/FavoritesList';
// import Store from './store/Store';

function App() {
    return (
            <div className="App">
                <Switch>
                    <Route path="/favorites" component={FavoritesList} />
                    <Route path="/" exact component={Home} />
                </Switch>
            </div>
    );
}

export default App;
