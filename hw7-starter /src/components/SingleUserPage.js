import React, { Component, PropTypes } from 'react';


class SingleUserPage extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  state = {
    avatar:'', name: '', age: 0
  };
  componentDidMount() {
    fetch(`/api/users/${this.props.id}`)
      .then(res => res.json())
      .then(json => this.setState( { avatar: json.avatar, name: json.name, age: json.age }));
  }

  render() {
    return (
      <div>
        <p>User {this.props.id}</p>
        <p>avatar: {this.state.avatar}</p>
        <p>name: {this.state.name}</p>
        <p>age: {this.state.age}</p>
      </div>);
  }
}

export default SingleUserPage;
