import React, { Component } from 'react';

import HomePage from './HomePage';
import UsersPage from './UsersPage';
import SingleUserPage from './SingleUserPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: window.location.hash.substr(1),
      users: [],
    };
    this.addUser = this.addUser.bind(this);
  }
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }
  addUser(e) {
    this.state.users = [...this.state.users, e];
    this.setState({ users: this.state.users });
    console.log(this.state.users);
  }
  renderRoute() {
    if (this.state.route === '/users') {
      return <UsersPage />;
    }
    if (this.state.route.startsWith('/users/')) {
      const id = this.state.route.split('/users/')[1];
      return <SingleUserPage id={id} />;
    }
    return <HomePage addAnUser={e => { this.addUser(e);}} />;
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/">Home</a></li>
          <li><a href="#/users">Users</a></li>
        </ul>
        {this.renderRoute()}
      </div>
    );
  }
}


export default App;
