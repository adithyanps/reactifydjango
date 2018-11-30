import React, { Component } from 'react';
import './App.css';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
import Vehicle from './containers/Vehicle';
import Navbar from './components/CustomNavbar';
import Show from './containers/Show';
import FormInline from './containers/FormInline';
import FormDetail from './containers/VehicleDetails';
import FormUpdate from './containers/FormUpdate';

import ViewForm from './containers/ViewForm';





class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App' >
          <Navbar />
          <Switch>
            <Route exact path="/" component={Vehicle} />
            <Route  path="/saved" component={FormInline} />
            <Route  path="/saved/:slug" component={FormDetail} />
            <Route  path="/saved/update" component={FormUpdate} />

            <Route  path="/Show" component={Show} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
