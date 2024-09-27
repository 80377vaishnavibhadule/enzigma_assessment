import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NewTask from './components/NewTask';
import EditTask from './components/EditTask';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/new" component={NewTask} />
                <Route path="/edit/:id" component={EditTask} />
            </Switch>
        </Router>
    );
};

export default App;
