import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TicketList from './components/TicketList';
import CreateTicket from './components/CreateTicket';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={TicketList} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/create-ticket" component={CreateTicket} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
