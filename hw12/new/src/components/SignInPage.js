import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';
import ReactQuill from 'react-quill';
import TagsInput from 'react-tagsinput';
import bcrypt from 'bcryptjs';


import 'react-tagsinput/react-tagsinput.css';
import 'quill/dist/quill.snow.css';

import './style.css';

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '123456',
      name: 'yoyochen',
    };
  }


  render() {
    const { isEditing } = this.state;
    const p={};
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
                <p style={p}>Username:</p>
                <input
                  type="text" className="form-control" style={{ width: '50em' }}
                  value={this.state.name} onChange={
                  e => this.setState({ name: e.target.value })
                }
                />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="input-group">
                <p style={p}>password:</p>
                <input
                  type="password" className="form-control" style={{ width: '50em' }}
                  value={this.state.password} onChange={
                  e => this.setState({ password: e.target.value })
                }
                />
            </div>
          </div>
        </div>
          <button
              className="btn btn-primary marginleft"
              role="button"
              onClick={() => {
                const body = {
                  password:this.state.password,
                  name:this.state.name,
                };
                fetch('/api/auth/signin', {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: JSON.stringify(body),
                }).then(result => result.json())
                .then((result)=>{
                  if(result.status)
                  {
                    window.location = 'http://localhost:3000/#/articles';
                    this.props.setID(result.id);
                  }
                  this.setState({});
                  console.log(result);
                })
              }}
            >確認</button>
              </div>
    );
  }
}

export default SignInPage;
