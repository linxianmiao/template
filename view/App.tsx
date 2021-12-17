import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Routes from './routes';
import { loginStore } from './store';
import { Provider } from './store/ContextProvider';
import '../public/scss/grid.scss'

const initstore = {
    loginStore
};

const App = () => {

    return (
        <Provider {...initstore}>
            <BrowserRouter>
                <Switch>
                    {Routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </BrowserRouter>        
        </Provider>

    ); 
};


ReactDOM.hydrate(<App />, document.getElementById('app'));